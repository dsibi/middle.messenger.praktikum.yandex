import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export default class Button extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}
