import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export interface LinkProps {
  linkText: string;
}

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
