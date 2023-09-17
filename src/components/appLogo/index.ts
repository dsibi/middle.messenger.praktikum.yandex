import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import path from "../../static/img/logo.png";

export interface LogoProps {
  logoPath: string;
}

export default class Logo extends Block<LogoProps> {
  constructor() {
    super({ logoPath: path });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
