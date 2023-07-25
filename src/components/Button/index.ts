import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";

export interface ButtonProps {
  type?: string;
  events: {
    click: () => void;
  };
}

export class Button extends Block<ButtonProps> {
  render() {
    // console.log(this.props);

    return this.compile(template, {
      ...this.props,
      type: this.props.type || "submit",
      style,
    });
  }
}
