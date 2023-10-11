import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Header } from "./header";
import { Message } from "./message";
import { Input } from "./input";

export interface MessengerProps {
  chats: ChatsProps[];
  messages: IMessage[];
}

export class Messenger extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    props.messages = [
      {
        id: 1,
        user_id: 1346581,
        chat_id: 27785,
        type: "message",
        time: "2023-10-10T14:54:40+00:00",
        content: "Сообщения, ",
        is_read: true,
        file: null,
      },
      {
        id: 2,
        user_id: 1346581,
        chat_id: 27785,
        type: "message",
        time: "2023-10-10T14:54:38+00:00",
        content: "которых я жду обновления",
        is_read: true,
        file: null,
      },
    ];
    super({
      header: new Header({ chats: props.chats }),
      message: props.messages.map((message: IMessage) => new Message(message)),
      input: new Input(),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
