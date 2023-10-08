import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { ChatList, ChatListProps } from "../../components/ChatList";
import { Messenger, MessengerProps } from "../../components/messenger";
import { connect } from "../../utils/connect";
import { Chats, ChatsProps } from "../../components/ChatList/chats";

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
      messenger: new Messenger(),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const ChatsPageWithStore = connect((state) => ({
  user: state.user,
  chats: state.chats,
}))(ChatsPage);
export default ChatsPageWithStore;
