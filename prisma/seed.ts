import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@site.com' },
    update: {},
    create: {
      email: 'admin@site.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('✅ Admin korisnik kreiran: admin@site.com / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
