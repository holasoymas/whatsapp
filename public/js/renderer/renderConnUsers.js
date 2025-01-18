import { omitEmail } from "../utils/omitEmail.js";

export function renderConnUsers(selector, users) {
  const $container = document.querySelector(selector);
  $container.innerHTML = "";
  users.forEach((user) => renderConnUser($container, user));
}

export function renderConnUser($container, user) {
  const $connUserItem = renderConnUserItem(user);
  $container.insertAdjacentHTML("beforeend", $connUserItem);
}

function renderConnUserItem(user) {
  const { connectedUserId, connectedUserEmail, chatId } = user;
  const email = omitEmail(connectedUserEmail);
  return `
    <div class="contact" data-user-id="${connectedUserId}" data-email="${connectedUserEmail}" data-chat-id="${chatId}">
      ${email}
    </div>
  `;
}
