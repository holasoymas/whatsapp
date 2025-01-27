import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(email) {
  return await prisma.user.create({
    data: { email },
  });
}

export async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function findOrCreateUser(email) {
  // Try to find the user
  let user = await prisma.user.findUnique({
    where: { email },
  });

  // If not found, create the user
  if (!user) {
    user = await prisma.user.create({
      data: { email },
    });
  }

  return user;
}

export async function getUsersByIds(ids) {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids, // Filter users whose ID is in the `ids` array
      },
    },
  });
  return users;
}

// for searching user
export async function findUserContains(email) {
  return await prisma.user.findMany({
    where: {
      email: { contains: email, mode: "insensitive" },
    },
  });
}
