import { omitEmail } from "../utils/omitEmail.js";

export function renderMessages(selector, messageDataArray) {
  console.log(messageDataArray);
  const $container = document.querySelector(selector);
  $container.innerHTML = "";
  messageDataArray.forEach((messageData) => renderMessage($container, messageData));
}

export function renderMessage($container, messageData) {
  const $messageDataItem = renderMessageDataItem(messageData);
  $container.insertAdjacentHTML("beforeend", $messageDataItem);
}

function renderMessageDataItem(messageData) {
  const { id, sender, receiver, message } = messageData;
  const connUser = document.querySelector(".chat-header h3").getAttribute("data-email");
  const msgType = connUser === sender ? "received" : "sent";
  const person = connUser === receiver ? "You" : omitEmail(sender);
  return `
      <div data-msg-id="${id}" class="message ${msgType}">
        <p><strong>${person}:</strong>${message}</p>
      </div>`;
}
