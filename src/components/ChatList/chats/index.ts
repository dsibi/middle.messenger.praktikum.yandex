import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import ChatsController from "../../../controllers/Chats-controller";

export class Chats extends Block<ChatsProps> {
  constructor(props: ChatsProps) {
    console.log(props);

    let lastMsgContent = props.last_message
      ? props.last_message.content
      : "No messages yet...";
    let lastMsgTime = props.last_message ? props.last_message.time : "";
    super({
      contactName: props.title,
      lastMsgTime: lastMsgTime,
      lastMsgText: lastMsgContent,
      chatID: props.id,
      events: {
        click: () => {
          ChatsController.getChatToken(this.props.chatID);
          // ChatsController.chatChange(id)
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
