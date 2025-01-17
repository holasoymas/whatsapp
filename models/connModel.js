import { PrismaClient } from "@prisma/client";
import Logger from "../utils/logger.js";

const prisma = new PrismaClient();

export async function findOrCreateChat(user1Id, user2Id) {
  try {
    const existingChat = await prisma.chat.findFirst({
      where: {
        OR: [
          { AND: [{ user1Id }, { user2Id }] }, // Check direct connection
          { AND: [{ user1Id: user2Id }, { user2Id: user1Id }] }, // Check reverse connection
        ],
      },
    });

    if (existingChat) {
      return existingChat;
    }

    return await prisma.chat.create({
      data: { user1Id, user2Id },
    });
  } catch (error) {
    console.error("Error creating or finding connection:", error);
    throw error;
  }
}

export async function findUserChats(userId) {
  try {
    const chats = await prisma.chat.findMany({
      where: {
        OR: [
          { user1Id: userId }, // User is in the first position
          { user2Id: userId }, // User is in the second position
        ],
      },
      include: {
        user1: true, // Include details of user1
        user2: true, // Include details of user2
      },
    });

    // Transform the results to get unique connections
    const connections = chats.map((chat) => ({
      chatId: chat.id,
      connectedUserId: chat.user1Id === userId ? chat.user2.id : chat.user1.id,
      connectedUserEmail: chat.user1Id === userId ? chat.user2.email : chat.user1.email,
    }));

    return connections;
  } catch (err) {
    Logger.error("Error while connecting db", err);
  }
}
