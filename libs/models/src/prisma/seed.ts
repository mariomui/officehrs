import { PrismaClient, Prisma } from '@prisma/client';
import {
  randEmail,
  randFirstName,
  randLastName,
  randNumber,
} from '@ngneat/falso';
const prisma = new PrismaClient({ log: ['query', 'info'] });

async function genCreateMentorData(
  opts = { length: 1 }
): Promise<Prisma.MentorCreateInput[]> {
  const { length } = opts;
  const lastNames = randLastName({ length });
  const firstNames = randFirstName({ length });
  const emails = randEmail({ length });
  const emailMap = {};
  return new Promise((re, rj) => {
    try {
      const result = Array(length)
        .fill(null)
        .map((_x, idx) => {
          if (!emailMap[emails[idx]]) {
            emailMap[emails[idx]] = true;
            return {
              lastName: lastNames[idx],
              firstName: firstNames[idx],
              email: emails[idx],
            };
          }
          return null;
        })
        .filter((op) => {
          return op;
        });
      if (result) {
        re(result);
      }
    } catch (err) {
      rj({ err });
    }
  });
}

/**
 * used to dynamically upsert a junction table record
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const makeExpertisesOnMentorsDatum = (
  mentorInput: Prisma.MentorCreateInput,
  expertiseInput: Prisma.ExpertiseCreateInput
): Prisma.ExpertisesOnMentorsCreateInput => {
  return {
    mentor: {
      connectOrCreate: {
        where: mentorInput,
        create: mentorInput,
      },
    },
    expertise: {
      connectOrCreate: {
        where: expertiseInput,
        create: expertiseInput,
      },
    },
  };
};

async function main() {
  // model data
  const mentors = await genCreateMentorData({ length: 100 });
  const numOfMentors = mentors.length;
  const expertises = [{ name: 'frontend' }, { name: 'backend' }];

  // helper functions
  const makeExpertiseIdx = () => {
    return (randNumber({ min: 10, max: 1000 }) % expertises.length) + 1;
  };

  // data boundary interfacers
  await prisma.mentor.createMany({
    data: mentors,
    skipDuplicates: true,
  });

  await prisma.expertise.createMany({
    data: expertises,
    skipDuplicates: true,
  });

  // create a random number of records connecting a mentor to a specialty
  /* ExpertiseMentor
  11 <--- 1 epxertise can have many mentors
  12
  11 <--- many expertises can have one mentor
  21
  
  */
  await prisma.expertisesOnMentors.createMany({
    data: Array(numOfMentors)
      .fill(null)
      .map(() => {
        return {
          mentorId: randNumber({ min: 1, max: numOfMentors - 1 }),
          expertiseId: makeExpertiseIdx(),
        };
      }),
    skipDuplicates: true,
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
