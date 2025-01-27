import { renderInitToMsgArea } from "../renderer/renderInitToMsgArea.js";
import { renderMessages } from "../renderer/renderMessages.js";
import { renderChatHeader } from "../renderer/renderMsgArea.js";
import { fetchFromServer } from "../utils/fetcher.js";
import { omitEmail } from "../utils/omitEmail.js";

const searchInput = document.querySelector("#searchbar");
const suggestionsBox = document.querySelector("#suggestionsBox");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  fetchFromServer(`chat/getUsers?userEmail=${encodeURIComponent(query)}`, "GET")
    .then((res) => {
      console.log(res.result);
      renderSuggestions(res.result.users);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(query);
});

export function renderSuggestions(suggestions) {
  console.log(suggestions);
  suggestionsBox.innerHTML = "";

  if (suggestions.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  suggestions.forEach((user) => {
    const suggestionItem = document.createElement("div");
    suggestionItem.classList.add("suggestion-item");

    const link = document.createElement("a");
    link.style.textDecoration = "none";
    link.style.color = "inherit";

    link.textContent = omitEmail(user.email);
    suggestionItem.appendChild(link);

    suggestionItem.classList.add("suggestion-hover");

    suggestionItem.addEventListener("click", () => {
      //FIX: create connection if not exist , and redirect to the chats
      //make api request
      fetchFromServer("chat/createOrGetConnection", "POST", { id: user.id })
        .then((res) => {
          const connectionInfo = res.result.connection;
          const chatId = connectionInfo.id;
          // console.log(connectionInfo);
          renderInitToMsgArea();
          renderChatHeader(user.id, user.email, chatId);
          fetchFromServer(`chat/getMessages/${chatId}`, "GET")
            .then((res) => {
              renderMessages(".chat-messages", res.result.messagesArray);
            })
            .catch(
              () =>
                (document.querySelector(".chat-messages").innerText = "Couldnt render messages"),
            );
          // console.log(res.result);
        })
        .catch((err) => console.error("Error while creating connection", err));
      // renderInitToMsgArea();
      // renderChatHeader();
      suggestionsBox.style.display = "none";
    });

    suggestionsBox.appendChild(suggestionItem);
  });

  suggestionsBox.style.display = "block";
}

document.addEventListener("click", (e) => {
  if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
    suggestionsBox.style.display = "none";
  }
});
