import { omitEmail } from "../utils/omitEmail.js";

export function renderChatHeader(userId, email, chatId) {
  const $headerContainer = document.querySelector(".chat-header h3");
  $headerContainer.setAttribute("data-user-id", userId);
  $headerContainer.setAttribute("data-email", email);
  $headerContainer.setAttribute("data-chat-id", chatId);
  $headerContainer.innerText = omitEmail(email);
}
