import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import style from "./style.scss";

export interface MessageProps {
  msgText: string;
  time: string;
  isInbox: boolean;
  isRead?: boolean;
}

export default class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(props);
  }
  render() {
    return this.compile(template, { style, ...this.props });
  }
}
