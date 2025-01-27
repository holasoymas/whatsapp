import path from "path";
import { decodeToken } from "../utils/jwt.js";
import { findOrCreateChat, findUserChats } from "../models/connModel.js";
import * as PrismaMessage from "../models/chatModel.js";
import { findUserContains } from "../models/userModel.js";

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

// searching user on searchbar
export const getUsersContains = async (req, res, next) => {
  try {
    const userEmail = req.query.userEmail;
    const users = await findUserContains(userEmail);
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

export const createOrGetConnection = async (req, res, next) => {
  try {
    const userId = req.body.id;

    const currUserToken = req.cookies.authToken;
    const decodedUser = decodeToken(currUserToken);
    const connection = await findOrCreateChat(userId, decodedUser.id);
    res.status(200).json({ connection });
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
