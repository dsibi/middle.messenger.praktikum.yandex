import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";
import { Header } from "./Header";
import { ChatListContact } from "./ChatListContact";
import { Chat, DataSet } from "../../data/chats";

export class ChatList extends Block {
  init() {
    this.children.header = new Header();
    this.children.chatListContact = DataSet.chats.map(
      (chat: Chat) =>
        new ChatListContact({
          logo: chat.contact.avatar,
          contact: chat.contact.name,
          lastMsgTime: chat.lastMsg.time.toLocaleDateString(),
          lastMsgIsInbox: chat.lastMsg.isInbox,
          lastMsgText: chat.lastMsg._msgText,
          unreadNumber: chat.unreadNumber,
          isActive: chat.isActive,
        })
    );
  }

  render() {
    // console.log(this);

    return this.compile(template, { style });
  }
}
