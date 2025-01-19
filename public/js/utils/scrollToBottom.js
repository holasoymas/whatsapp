export function scrollToBottom() {
  const lastMessage = document.querySelector("#messageContainer .message:last-child");
  if (lastMessage) {
    lastMessage.scrollIntoView({ behavior: "smooth" });
  }
}
