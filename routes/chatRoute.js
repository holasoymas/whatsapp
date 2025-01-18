import express from "express";
import * as ChatControllers from "../controllers/chatControllers.js";
const chatRoute = express.Router();

chatRoute.get("", ChatControllers.getChatRoute);
chatRoute.get("/getChats", ChatControllers.getChats);

chatRoute.get("/getMessages/:chatId", ChatControllers.getMessages);
chatRoute.post("/sendMessages", ChatControllers.sendMessages);

export { chatRoute };
