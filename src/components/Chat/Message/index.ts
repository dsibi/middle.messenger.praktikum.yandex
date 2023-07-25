import Block from "../../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";

export interface MessageProps {
  // isUsersMessage: boolean;
  // logo: string;
  // content: string | string[];
  // isImages: boolean;
  // date: {
  //   day: string;
  //   time: string;
  // };
}

export class Message extends Block<MessageProps> {
  render() {
    return this.compile(template, {
      style,
      ...this.props,
    });
  }
}
