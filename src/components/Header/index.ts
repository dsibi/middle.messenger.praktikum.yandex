import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";

export class Header extends Block {
  render() {
    return this.compile(template, { style_header: style.header });
  }
}
