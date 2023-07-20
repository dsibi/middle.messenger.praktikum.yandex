import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";

export interface AvatarProps {
  avaPath: string;
}

export class Avatar extends Block<AvatarProps> {
  render() {
    return this.compile(template, { ...this.props, style });
  }
}
