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

  componentDidUpdate(oldProps: any, newProps: any) {
    if (oldProps.chats !== newProps.chats) {
      this.children.header.setProps({
        user: newProps.user,
      });
      if (newProps.chats) {
        // this.children.chats = newProps;
        // let quantity = this.children.chats
        for (let i = 0; i < this.children.chats.length; i++) {
          this.children.chats[i].setProps(newProps.chats[i]);
        }
      }
    }
    return true;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
