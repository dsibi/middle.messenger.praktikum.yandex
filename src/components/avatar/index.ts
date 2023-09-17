import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import path from "../../static/img/avatar.png";

export default class Avatar extends Block {
  constructor() {
    super({ avaPath: path });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
