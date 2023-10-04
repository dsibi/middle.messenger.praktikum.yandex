import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Avatar, AvaProps } from "../../avatar";
import myAvaPath from "../../../static/img/avatar.png";
import settingsAvaPath from "../../../static/img/dots_white.png";
import AuthController from "../../../controllers/Auth-controller";

export interface HeaderProps {
  myAva: AvaProps;
  name: string;
  settingsAva: AvaProps;
}
export class Header extends Block<HeaderProps> {
  constructor() {
    super({
      myAva: new Avatar({
        avaPath: myAvaPath,
        altText: "My Ava",
      }),
      name: "Dmitry Sib",
      settingsAva: new Avatar({
        avaPath: settingsAvaPath,
        altText: "Settings",
        events: {
          click: () => AuthController.user(),
        },
      }),
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
