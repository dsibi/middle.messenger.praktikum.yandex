import Block from "../../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";

export interface LinkProps {
  text: string;
  events: {
    click: () => void;
  };
}

export class Link extends Block<LinkProps> {
  render() {
    return this.compile(template, {
      ...this.props,
      style,
    });
  }
}
