import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/auth';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.role !== 'admin') {
    return res.status(401).json({ message: 'Ne postoji admin' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Pogrešna lozinka' });

  const token = generateToken({ id: user.id, role: user.role });

  res.setHeader('Set-Cookie', serialize('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
    sameSite: 'lax',
  }));

  return res.status(200).json({ message: 'Uspesno' });
}
