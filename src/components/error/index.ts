import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export default class Error extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}
