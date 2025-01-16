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
  return `
    <div class="contact" data-uid="${connectedUserId}" data-email="${connectedUserEmail}" data-chat-id="${chatId}">
      ${connectedUserEmail}
    </div>
  `;
}
