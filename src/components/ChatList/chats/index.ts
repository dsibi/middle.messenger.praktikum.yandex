import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export interface ChatsProps {
  path: string;
  contactName: string;
  lastMsgTime: string;
  lastMsgIsInbox: boolean;
  lastMsgText: string;
  unreadNumber: number;
  // isActive: boolean;
  // events: {
  //   click: () => void;
  // };
}

export class Chats extends Block<ChatsProps> {
  constructor(props: ChatsProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
