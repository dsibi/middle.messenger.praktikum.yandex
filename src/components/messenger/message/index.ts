import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export interface MessageProps {
  msgText: string;
  time: string;
  isInbox: boolean;
  isRead?: boolean;
  msgStyle: string;
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    if (props.isInbox) {
      props.msgStyle = "msgIncome";
    } else {
      props.msgStyle = "msgOutcome";
    }
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
