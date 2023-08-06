import Block from "../../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";
import { Avatar } from "../../../components/Avatar";
import { Settings } from "../../../components/Settings";
import controller from "../../../utils/ApiClient";
import { PATHNAMES } from "../../../utils/paths";

export interface HeaderProps {
  events: {
    click: () => void;
  };
}

export class Header extends Block<HeaderProps> {
  init() {
    this.children.myAva = new Avatar({
      avaPath: "../../../static/img/avatar.png",
      width: "47px",
    });
    this.children.settings = new Settings({
      avaPath: "../../../static/img/dots_white.png",
      width: "50px",
      events: {
        click: () => {
          controller("logout", PATHNAMES.SIGNIN_PATH);
        },
      },
    });
  }

  render() {
    // console.log(this);

    return this.compile(template, { style, ...this.props, name: "Dmitry Sib" });
  }
}
