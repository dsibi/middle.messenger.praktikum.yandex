import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export interface ErrorProps {
  desc: string;
  errorPath: string;
  events: {
    click: (e: Event) => void;
  };
}

export class Error extends Block {
  constructor(props: ErrorProps) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
