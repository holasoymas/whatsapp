import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// at when user click feetch previous
// give them a message id of the messsage[0].id // last id
export async function fetchMessagesByChatId(chatId, lastMessageId = null) {
  try {
    return await prisma.message.findMany({
      where: { chatId: chatId },
      orderBy: { createdAt: "asc" },
      take: -10, // fetch the last 10 messages
      ...(lastMessageId && { cursor: { id: lastMessageId }, skip: 1 }), // Skip the cursor message and fetch the next batch
    });
  } catch (error) {
    console.error("Error fetching previous messages:", error);
    throw error;
  }
}

export async function createMessage({ chatId, sender, receiver, message }) {
  return await prisma.message.create({
    data: { chatId, sender, receiver, message },
  });
}
