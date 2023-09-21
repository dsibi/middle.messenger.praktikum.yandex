import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { ChatList, ChatListProps } from "../../components/ChatList";
import { Messenger, MessengerProps } from "../../components/messenger";

export interface ChatsPageProps {
  chatList: ChatListProps;
  messenger: MessengerProps;
}

export default class ChatsPage extends Block<ChatsPageProps> {
  init() {
    this.children.chatList = new ChatList();
    this.children.messenger = new Messenger();
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
