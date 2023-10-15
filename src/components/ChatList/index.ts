import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Header } from "./header";
import { Chats } from "./chats";
import ChatsController from "../../controllers/Chats-controller";
import Store from "../../utils/Store";

export interface ChatListProps {
  user: UserData;
  chats: ChatsProps[];
}

export class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({ ...props });
  }

  protected initChildren(): void {
    this.children.header = new Header({ user: this.props.user });
  }

  protected init(): void {
    this.children.chats = this.createChats({
      chats: this.props.chats,
      user: this.props.user,
    });
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    if (oldProps !== newProps) {
      if (newProps.user) {
        (this.children.header as Block<any>).setProps({
          user: newProps.user,
        });
      }
      if (newProps.chats) {
        this.children.chats = this.createChats({
          chats: newProps.chats,
          user: newProps.user,
        });
      }
      return true;
    }
    return false;
  }

  private createChats(props: ChatListProps) {
    let activeChatId = Store.getState().activeChatId;
    return props.chats.map(
      (data) =>
        new Chats({
          ...data,
          activeChat: data.id == activeChatId ? "chatIsActive" : "",
          events: {
            click: () => {
              ChatsController.selectChat(data.id);
            },
          },
        })
    );
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
