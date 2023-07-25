import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";
import { Message } from "./Message";
import { Header } from "./Header";
import { messageBlock } from "./messageBlock";
import { bestFriendChat } from "../../data/chats";

export class Chat extends Block {
  init() {
    this.children.header = new Header({ name: "Best Friend" });
    this.children.message = bestFriendChat.messageCollection.map(
      (message) => new Message(message)
    );
    this.children.messageBlock = new messageBlock();
  }

  render() {
    return this.compile(template, { style });
  }
}
