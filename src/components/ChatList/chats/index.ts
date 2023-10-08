import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export interface ChatsProps {
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    time: string;
    content: string;
  };
}

export class Chats extends Block<ChatsProps> {
  constructor(props: ChatsProps) {
    super({
      contactName: props.title,
      // lastMsgTime: props.last_message.time,
      // lastMsgText: props.last_message.content,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
