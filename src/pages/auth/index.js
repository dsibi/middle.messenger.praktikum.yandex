import tmpl from "./tmpl.hbs";

const CHAT_NAMES = ["Название чата 1", "Название чата 2", "Название чата 3"];

const chats = tmpl({
  wrapperClassName: "chat__wrapper",
  buttonText: "Добавить чат",
  chatListClassName: "chat__list",
  chatListItems: CHAT_NAMES,
});
console.log(chats);

document.getElementById("app").innerHTML = chats;
