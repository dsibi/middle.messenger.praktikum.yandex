import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export interface ButtonProps {
  id: string;
  label: string;
  events: {
    click: () => void;
  };
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
