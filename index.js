import "dotenv/config";
import app from "./app.js";
import http from "node:http";
import Logger from "./utils/logger.js";
import Config from "./utils/config.js";
import { Server } from "socket.io";
import { decodeToken } from "./utils/jwt.js";
import { parseCookies } from "./utils/parseCookies.js";
import { createMessage } from "./models/chatModel.js";
const httpServer = http.createServer(app);

const io = new Server(httpServer);

//online users
const users = {};

io.on("connection", (socket) => {
  Logger.info(`A user connected : `, socket.id);
  const cookies = parseCookies(socket.request.headers.cookie) || "";
  const authToken = cookies.authToken;
  const userData = decodeToken(authToken);
  // add the current connected user to the users obj and bind a socket id
  users[userData.email] = socket.id;

  socket.on("private_message", async ({ chatId, receiver, message }) => {
    const messageMetaData = {
      chatId,
      sender: userData.email,
      receiver,
      message,
    };
    const messageData = await createMessage(messageMetaData);

    // if users[receiver] return an id we know that the receiver is online
    const recipientSocketId = users[receiver];

    // if user is online emit the receive_message else just save to database
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receive_message", messageData);
    }
  });
});

httpServer.listen(Config.PORT, () => {
  Logger.info(`Listening on port : http://localhost:${Config.PORT}`);
});
