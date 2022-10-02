import { PrismaClient, Prisma, Roles } from '@prisma/client';
import {
  randAddress,
  randEmail,
  randFirstName,
  randLastName,
  randNumber,
  randPassword,
} from '@ngneat/falso';
const prisma = new PrismaClient({ log: ['query', 'info'] });

async function genAddressData(
  opts = { length: 1 }
): Promise<Prisma.AddressCreateInput[]> {
  const { length } = opts;
  return new Promise((re, rej) => {
    const addreses = randAddress({ length });
    try {
      const mappedAddreses = addreses.map((address) => {
        return {
          address_street: address.street,
          address_city: address.city,
          address_zip: address.zipCode,
          address_county: address.county,
          address_country: address.country,
        };
      });
      return re(mappedAddreses);
    } catch (err) {
      rej({ err });
    }
  });
}
async function genUserData(
  opts = { length: 1, role: Roles.Mentor, numOfAddresses: 1 }
): Promise<Prisma.UserCreateInput[]> {
  const { length, role, numOfAddresses } = opts;
  const lastNames = randLastName({ length });
  const firstNames = randFirstName({ length });
  const emails = randEmail({ length });
  const salts = randPassword({
    size: randNumber({ min: 5, max: 8 }),
    length,
  });
  const passwords = randPassword({
    size: randNumber({ min: 10, max: 15 }),
    length,
  });

  const emailMap = {};
  function getAddressId(addressId) {
    return addressId <= 0 ? {} : { addressId };
  }
  return new Promise((re, rj) => {
    try {
      let _addressCount = numOfAddresses;
      const result = Array(length)
        .fill(null)
        .map((_x, idx) => {
          if (!emailMap[emails[idx]]) {
            emailMap[emails[idx]] = true;
            return {
              user_email: emails[idx],
              user_hashedpw: passwords[idx],
              user_name: lastNames[idx],
              user_salt: salts[idx],
              user_surname: firstNames[idx],
              Role: role,
              ...getAddressId(_addressCount--),
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

async function main() {
  // model data

  const addresses = await genAddressData({ length: 50 });
  const expertises = [{ name: 'frontend' }, { name: 'backend' }];

  // helper functions
  const makeExpertiseIdx = () => {
    return (randNumber({ min: 10, max: 1000 }) % expertises.length) + 1;
  };

  const $addresses = await prisma.address.createMany({
    data: addresses,
    skipDuplicates: true,
  });

  const mentors = await genUserData({
    length: 50,
    role: Roles.Mentor,
    numOfAddresses: $addresses.count,
  });
  const numOfMentors = mentors.length;

  // data boundary interfacers
  await prisma.user.createMany({
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
  await prisma.expertisesOnUsers.createMany({
    data: Array(numOfMentors)
      .fill(null)
      .map(() => {
        return {
          userId: randNumber({ min: 1, max: numOfMentors - 1 }),
          expertiseId: makeExpertiseIdx(),
        };
      }),
    skipDuplicates: true,
  });
}

// create mentee filling

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
