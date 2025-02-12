import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();
async function main() {
  await prisma.user.create({
    data: {
      email: 'admin@email.com',
      name: 'Admin',
      role: Role.ADMIN,
      passHash: await hash('Password123?'),
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
