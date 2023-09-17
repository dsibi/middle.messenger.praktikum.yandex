import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import Input, { InputProps } from "./input";

export interface FormProps {
  input: Array<InputProps>;
}

export default class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super({ input: props.input.map((input: InputProps) => new Input(input)) });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
