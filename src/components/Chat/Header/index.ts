import Block from "../../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";
import { Avatar } from "../../../components/Avatar";

export interface HeaderProps {}

export class Header extends Block<HeaderProps> {
  init() {
    this.children.settingsAva = new Avatar({
      avaPath: "../../../static/img/dots_white.png",
      width: "50px",
    });
  }

  render() {
    // console.log(this);

    return this.compile(template, { style, ...this.props });
  }
}
