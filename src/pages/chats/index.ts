import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { ChatList, ChatListProps } from "../../components/ChatList";
import { Messenger, MessengerProps } from "../../components/messenger";
import { connect } from "../../utils/connect";

export interface ChatsPageProps {
  chatList: ChatListProps;
  messenger: MessengerProps;
}

export class ChatsPage extends Block<ChatsPageProps> {
  constructor(props: any) {
    super({
      chatList: new ChatList({
        user: props.user,
        chats: props.chats,
      }),
      messenger: new Messenger({ chats: props.chats }),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const ChatsPageWithStore = connect((state) => ({
  user: state.user,
  chats: state.chats,
  messages: [...(state.messages || [])],
  activeChat: state.activeChat,
  searchChatText: state.searchChatText,
}))(ChatsPage);
export default ChatsPageWithStore;
