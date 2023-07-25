import Block from "../../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";

export interface ChatListContactProps {
  logo: string;
  contact: string;
  lastMsgTime: Date;
  lastMsgIsInbox: boolean;
  lastMsgText: string;
  unreadNumber: number;
  isActive: boolean;
  events: {
    click: () => void;
  };
}

export class ChatListContact extends Block<ChatListContactProps> {
  render() {
    // console.log(this.props);
    return this.compile(template, {
      style: {
        ...style,
        chatListContact: this.props.isActive
          ? style.chatIsActive
          : style.chatListContact,
      },
      ...this.props,
    });
  }
}
