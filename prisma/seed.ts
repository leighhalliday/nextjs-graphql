import { PrismaClient } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();

async function main() {
  await prisma.album.deleteMany();
  await prisma.artist.deleteMany();

  for (let i = 0; i < 100; i++) {
    await prisma.artist.create({
      data: {
        name: `The ${faker.address.city()} ${faker.date.weekday()}s`,
        url: faker.internet.url(),
        albums: {
          create: [
            { name: faker.commerce.productName(), year: "2010" },
            {
              name: faker.datatype.uuid(),
              year: `20${Math.random().toFixed(2).substr(-2, 2)}`,
            },
          ],
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
