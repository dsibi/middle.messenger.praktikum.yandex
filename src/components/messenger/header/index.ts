import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Avatar, AvaProps } from "../../avatar";
import settingsAvaPath from "../../../static/img/dots_white.png";

export interface HeaderProps {
  name: string;
  settingsAva: AvaProps;
}

export class Header extends Block<HeaderProps> {
  constructor() {
    super({
      name: "Best Friend",
      settingsAva: new Avatar({
        avaPath: settingsAvaPath,
        altText: "Settings",
      }),
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
