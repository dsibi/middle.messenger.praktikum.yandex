import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export class Message extends Block<IMessage> {
  constructor(props: IMessage) {
    // if (props.isInbox) {
    //   props.msgStyle = "msgIncome";
    // } else {
    //   props.msgStyle = "msgOutcome";
    // }
    super({
      msgText: props.content,
      time: props.time,
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
