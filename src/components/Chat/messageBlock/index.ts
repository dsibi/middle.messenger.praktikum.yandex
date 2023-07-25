import Block from "../../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";

export class messageBlock extends Block {
  render() {
    return this.compile(template, { style });
  }
}
