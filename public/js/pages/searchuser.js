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
      // renderInitToMsgArea();
      // renderChatHeader();
      searchInput.value = user.email;
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
