import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const initialPosts: Prisma.PostCreateInput[] = [
  {
    title: "post 1",
    slug: "post-1",
    content: "content of post 1",
    author: {
      connectOrCreate: {
        where: {
          email: "test@test.com",
        },
        create: {
          email: "test@test.com",
          hashedPasswoed: "aaa",
        },
      },
    },
  },
];

async function main() {
  console.log("Start seeding...");
  for (const post of initialPosts) {
    const newPost = await prisma.post.create({ data: post });
  }
  console.log(`Seeding finished.`);
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
