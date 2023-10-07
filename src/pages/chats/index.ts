import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import ChatListWithStore, { ChatListProps } from "../../components/ChatList";
import { Messenger, MessengerProps } from "../../components/messenger";
import ChatsController from "../../controllers/Chats-controller";

export interface ChatsPageProps {
  chatList: ChatListProps;
  messenger: MessengerProps;
}

export default class ChatsPage extends Block<ChatsPageProps> {
  constructor() {
    super({
      chatList: new ChatListWithStore({}),
      messenger: new Messenger(),
    });
    this.loadChats();
  }
  loadChats() {
    ChatsController.getChats();
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
