import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export interface ErrorProps {
  desc: string;
  errorPath: string;
}

export class Error extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
