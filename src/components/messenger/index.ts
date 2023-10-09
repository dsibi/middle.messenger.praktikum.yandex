import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Header } from "./header";
import { Message } from "./message";
import { Input } from "./input";
import { bestFriendChat } from "../../data/chats";

export interface MessengerProps {
  chats: ChatsProps[];
}

export class Messenger extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super({
      header: new Header({ chats: props.chats }),
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
