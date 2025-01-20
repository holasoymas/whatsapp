import { renderMessage } from "../renderer/renderMessages.js";
import { scrollToBottom } from "../utils/scrollToBottom.js";

const socket = io();

document.querySelector(".send-btn").addEventListener("click", sendMessages);
const messageArea = document.querySelector("#messageContainer");

function sendMessages() {
  let message = document.querySelector("#messageInput").value;

  const chatId = document.querySelector(".chat-header h3").getAttribute("data-chat-id");
  const receiver = document.querySelector(".chat-header h3").getAttribute("data-email");

  const html = `
    <div class="message sent">
      <p><strong>You:</strong> ${message}</p>
    </div>
  `;

  const messageMetaData = { chatId, receiver, message };

  // initiate a private_message event
  socket.emit("private_message", messageMetaData);
  messageArea.insertAdjacentHTML("beforeend", html);

  // clear the msg box after sending messages
  document.querySelector("#messageInput").value = "";
  scrollToBottom();
}

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("receive_message", (messageData) => {
  renderMessage(messageArea, messageData);
  scrollToBottom();
});
