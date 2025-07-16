// src/pages/api/admin/home.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Dummy baza u memoriji (privremeno)
let homeContent = {
  heroImage: '/images/hero-phone.png',
  description: 'Telefon za venčanja koji omogućava gostima da ostave poruke.',
  steps: [
    'Postavi telefon na mesto događaja',
    'Gosti ostavljaju poruke',
    'Preuzmi video snimke posle događaja',
  ],
  gallery: ['/images/gal1.jpg', '/images/gal2.jpg'],
  seo: {
    title: 'Telefon za venčanja',
    description: 'Zabeleži glasovne poruke svojih gostiju na elegantan način.',
    image: '/images/opengraph.png',
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(homeContent);
  }

  if (req.method === 'PUT') {
    const { heroImage, description, steps, gallery, seo } = req.body;

    if (!heroImage || !description || !Array.isArray(steps)) {
      return res.status(400).json({ message: 'Neispravan unos' });
    }

    homeContent = { heroImage, description, steps, gallery, seo };
    return res.status(200).json({ message: 'Sadržaj uspešno ažuriran' });
  }

  return res.status(405).json({ message: 'Metoda nije dozvoljena' });
}
