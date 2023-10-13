import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Header } from "./header";
import { Message } from "./message";
import { Input } from "./input";
import Store from "../../utils/Store";

export interface MessengerProps {
  chats: ChatsProps[];
  messages: IMessage[];
}

export class Messenger extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super({ ...props });
  }

  protected initChildren(): void {
    this.children.header = new Header({ chats: this.props.chats });
    this.children.input = new Input();
  }

  protected init(): void {
    this.children.message = this.createMessages(this.props);
  }

  private createMessages(props: MessengerProps) {
    if (props) {
      if (props.messages) {
        return props.messages.map((data) => new Message(data));
      }
    }
    return [];
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    if (oldProps !== newProps) {
      this.children.header.setProps({
        chats: newProps.chats,
        name: Store.getState().activeChatName,
      });
      if (newProps.messages) {
        this.children.message = this.createMessages({
          chats: newProps.chats,
          messages: newProps.messages,
        });
      }
    }
    return true;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
