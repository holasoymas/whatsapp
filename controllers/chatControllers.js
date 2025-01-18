import path from "path";
import { decodeToken } from "../utils/jwt.js";
import { findUserChats } from "../models/connModel.js";
import * as PrismaMessage from "../models/chatModel.js";

const __dirname = path.resolve();

export const getChatRoute = async (req, res, next) => {
  try {
    // get the cookie value
    const token = req.cookies.authToken;
    if (!token) {
      return res.redirect("/login");
    }
    //if this return error , they will be redirected to error throught middleware
    decodeToken(token);
    res.sendFile(path.join(__dirname, "public", "chat.html"));
  } catch (err) {
    next(err);
  }
};

export const getChats = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.redirect("/login");
    }
    const userData = decodeToken(token);
    // get who he messages to (connected users)
    const connectedUsers = await findUserChats(userData.id);
    res.status(200).json({ connectedUsers });
  } catch (err) {
    next(err);
  }
};

export const sendMessages = async (req, res, next) => {
  try {
    const { chatId, receiver, message } = req.body;
    console.log(chatId, receiver, message);
    const token = req.cookies.authToken;
    if (!token) return res.redirect("/login");
    const userData = decodeToken(token);
    const sender = userData.email;
    const messageData = await PrismaMessage.createMessage({ chatId, sender, receiver, message });
    res.status(201).json({ messageData });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) return res.redirect("/login");

    const chatId = req.params.chatId;
    const messagesArray = await PrismaMessage.fetchMessagesByChatId(chatId);
    res.status(200).json({ messagesArray });
  } catch (err) {
    next(err);
  }
};
