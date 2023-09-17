import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export default class Link extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}
