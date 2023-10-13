import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export interface ButtonProps {
  id: string;
  label: string;
  events: {
    click: (e: Event) => void;
  };
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
