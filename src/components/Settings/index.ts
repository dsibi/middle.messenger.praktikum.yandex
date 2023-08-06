import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";

export interface SettingsProps {
  avaPath: string;
}

export class Settings extends Block<SettingsProps> {
  render() {
    return this.compile(template, { ...this.props, style });
  }
}
