import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Header, HeaderProps } from "./header";
import { Chats, ChatsProps } from "./chats";
import { Chat, DataSet } from "../../data/chats";

export interface ChatListProps {
  header: HeaderProps;
  chats: ChatsProps;
}

export class ChatList extends Block<ChatListProps> {
  constructor() {
    super({
      header: new Header(),
      chats: DataSet.chats.map(
        (chat: Chat) =>
          new Chats({
            path: chat.contact.avatar,
            contactName: chat.contact.name,
            lastMsgTime: chat.lastMsg.time.toLocaleDateString(),
            lastMsgIsInbox: chat.lastMsg.isInbox,
            lastMsgText: chat.lastMsg.msgText,
            unreadNumber: chat.unreadNumber,
            // isActive: chat.isActive,
          })
      ),
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
