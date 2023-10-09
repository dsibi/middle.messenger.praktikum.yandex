import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Header } from "./header";
import { Chats } from "./chats";

export interface ChatListProps {
  user: UserData;
  chats: ChatsProps[];
}

export class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({
      header: new Header({ user: props.user }),
      chats: props.chats.map((chat: ChatsProps) => new Chats(chat)),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
