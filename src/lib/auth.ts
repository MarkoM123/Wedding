import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

const SECRET = process.env.JWT_SECRET || 'tajna';

export function generateToken(user: { id: number; role: string }) {
  return jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '7d' });
}

export function verifyToken(req: NextApiRequest): null | { id: number; role: string } {
  try {
    const token = req.cookies.token;
    if (!token) return null;

    return jwt.verify(token, SECRET) as { id: number; role: string };
  } catch {
    return null;
  }
}
