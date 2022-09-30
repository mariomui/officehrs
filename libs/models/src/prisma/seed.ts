import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient({ log: ['query', 'info'] });

const mentorData = (): Prisma.MentorCreateInput => {
  return {
    name: 'mario',
    email: 'mario@mario.com',
  };
};

async function main() {
  await prisma.mentor.create({ data: mentorData() });
  await prisma.expertise.createMany({
    data: [{ name: 'frontend' }, { name: 'backend' }],
  });
}
// i shall find a way to m

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
