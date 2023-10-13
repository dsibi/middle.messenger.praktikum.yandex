import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import ChatsController from "../../../controllers/Chats-controller";
import MessagerController from "../../../controllers/Messager-controller";
import Store from "../../../utils/Store";

export class Chats extends Block {
  constructor(props: any) {
    let lastMsgContent = props.last_message
      ? props.last_message.content
      : "No messages yet...";
    let lastMsgTime = props.last_message ? props.last_message.time : undefined;
    super({
      ...props,
      title: props.title,
      last_message: {
        time: lastMsgTime,
        content: lastMsgContent,
      },
      avatar: "",
      unread_count: 0,
      created_by: 0,
      id: props.id,
      events: {
        click: async () => {
          const token = await ChatsController.getChatToken(this.props.id);
          const notActiveChat = document.getElementById(
            Store.getState().activeChatId
          );
          notActiveChat!.setAttribute("class", "");
          const activeChat = document.getElementById(this.props.id);
          activeChat!.setAttribute("class", "chatIsActive");
          Store.set("activeChatId", this.props.id);
          Store.set("activeChatName", this.props.title);
          MessagerController.exit();
          const userId = Store.getState().user.id;
          MessagerController.connect({
            userId: userId,
            chatId: this.props.id,
            token: token.token,
          });
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
