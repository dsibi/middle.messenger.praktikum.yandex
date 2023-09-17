import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import Input, { InputProps } from "./input";

export default class Form extends Block {
  init() {
    this.children.input = this.props.input.map(
      (input: InputProps) => new Input(input)
    );
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
