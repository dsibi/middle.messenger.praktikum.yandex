import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Header, HeaderProps } from "./header";
import { Message, MessageProps } from "./message";
import { Input, InputProps } from "./input";
import { bestFriendChat } from "../../data/chats";

export interface MessengerProps {
  header: HeaderProps;
  message: MessageProps;
  input: InputProps;
}

export class Messenger extends Block<MessengerProps> {
  constructor() {
    super({
      header: new Header(),
      message: bestFriendChat.messageCollection.map(
        (message) =>
          new Message({
            msgText: message.msgText,
            time: message.time.toLocaleTimeString().replace(/(.*)\D\d+/, "$1"),
            isInbox: message.isInbox,
            isRead: message.isRead,
            msgStyle: "",
          })
      ),
      input: new Input(),
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
