import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth'; // ✅ dodato

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const data = await prisma.homeContent.findUnique({ where: { id: 1 } });

    if (!data) {
      return res.status(404).json({ message: 'Home sadržaj nije pronađen' });
    }

    return res.status(200).json({
      heroImage: data.heroImage,
      description: data.description,
      steps: JSON.parse(data.steps),
      gallery: JSON.parse(data.gallery),
      seo: {
        title: data.seoTitle,
        description: data.seoDesc,
        image: data.seoImage,
      },
    });
  }

  if (req.method === 'PUT') {
    // ✅ Provera tokena
    const user = verifyToken(req);
    if (!user || user.role !== 'admin') {
      return res.status(401).json({ message: 'Nedozvoljeno – samo admin' });
    }

    const { heroImage, description, steps, gallery, seo } = req.body;

    if (!heroImage || !description || !Array.isArray(steps)) {
      return res.status(400).json({ message: 'Neispravan unos' });
    }

    const updated = await prisma.homeContent.upsert({
      where: { id: 1 },
      update: {
        heroImage,
        description,
        steps: JSON.stringify(steps),
        gallery: JSON.stringify(gallery),
        seoTitle: seo.title,
        seoDesc: seo.description,
        seoImage: seo.image,
      },
      create: {
        id: 1,
        heroImage,
        description,
        steps: JSON.stringify(steps),
        gallery: JSON.stringify(gallery),
        seoTitle: seo.title,
        seoDesc: seo.description,
        seoImage: seo.image,
      },
    });

    return res.status(200).json({ message: 'Sadržaj ažuriran', updated });
  }

  return res.status(405).json({ message: 'Metoda nije dozvoljena' });
}
