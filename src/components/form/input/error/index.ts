import Block from "../../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export interface ErrorProps {
  text?: string;
}

export class Error extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super(props);
  }

  set error(text: string) {
    this.setProps({ text });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
