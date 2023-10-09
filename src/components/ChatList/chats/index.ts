import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

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
