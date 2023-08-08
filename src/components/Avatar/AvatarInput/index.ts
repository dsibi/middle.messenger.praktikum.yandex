import Block from "../../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";

export interface AvatarInputProps {}

export class AvatarInput extends Block<AvatarInputProps> {
  render() {
    return this.compile(template, { ...this.props, style });
  }
}
