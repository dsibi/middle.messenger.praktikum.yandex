/* eslint-disable @typescript-eslint/semi */
import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";
import { ChatList } from "../../components/ChatList";
import { Chat } from "../../components/Chat";

export class ChatsPage extends Block {
  init() {
    this.children.chatList = new ChatList();
    this.children.chat = new Chat();
  }

  render() {
    return this.compile(template, { style });
  }
}
