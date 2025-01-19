import { renderConnUsers } from "../renderer/renderConnUsers.js";
import { renderInitToMsgArea } from "../renderer/renderInitToMsgArea.js";
import { renderMessages } from "../renderer/renderMessages.js";
import { renderChatHeader } from "../renderer/renderMsgArea.js";
import { fetchFromServer } from "../utils/fetcher.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchFromServer("chat/getChats", "GET")
    .then((res) => {
      console.log(res);
      renderConnUsers("#chat-list", res.result.connectedUsers);
    })
    .catch((_err) => (document.querySelector("#chat-list").innerText = "Couldn't load users"));

  // event deligation
  const chatListContainer = document.querySelector("#chat-list");
  chatListContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("contact")) {
      const { userId, email, chatId } = e.target.dataset;
      console.log("You clicked on a contact", chatId);
      renderInitToMsgArea();
      renderChatHeader(userId, email, chatId);
      fetchFromServer(`chat/getMessages/${chatId}`, "GET")
        .then((res) => {
          console.log(res);
          renderMessages(".chat-messages", res.result.messagesArray);
        })
        .catch(
          () => (document.querySelector(".chat-messages").innerText = "Couldn't load messages"),
        );
    }
  });
});
