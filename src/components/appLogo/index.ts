import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import path from "../../static/img/logo.png";

export default class Logo extends Block {
  constructor() {
    super({ logoPath: path });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
