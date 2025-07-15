// file: /pages/api/contact.ts (Next.js API route with validation, reCAPTCHA, and DB logging)

import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const EMAIL_TO = process.env.CONTACT_EMAIL_TO || 'your@email.com';
const EMAIL_FROM = process.env.CONTACT_EMAIL_FROM || 'noreply@phonesite.com';
const SMTP_PASS = process.env.SMTP_PASSWORD;
const SMTP_USER = process.env.SMTP_USER;
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
  token: z.string(),
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const parse = contactSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const { name, email, message, token } = parse.data;

  // Verify reCAPTCHA
  try {
    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
    });
    const recaptchaData = await recaptchaRes.json();
    if (!recaptchaData.success) {
      return res.status(400).json({ error: 'reCAPTCHA failed' });
    }
  } catch (err) {
    console.error('[reCAPTCHA error]', err);
    return res.status(500).json({ error: 'reCAPTCHA verification failed' });
  }

  // Log in DB
  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        createdAt: new Date(),
      },
    });
  } catch (err) {
    console.error('[DB Log error]', err);
  }

  // Send email
  try {
    await transporter.sendMail({
      from: `${name} <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      subject: `Poruka sa sajta od ${name}`,
      text: `Ime: ${name}\nEmail: ${email}\n\nPoruka:\n${message}`,
    });

    return res.status(200).json({ message: 'Sent successfully' });
  } catch (error) {
    console.error('[Kontakt greška]', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
