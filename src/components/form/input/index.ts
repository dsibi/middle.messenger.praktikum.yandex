import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export interface InputProps {
  label: string;
  name: string;
  type: string;
  error?: string;
  value?: string;
  // events: {
  //   click: () => void;
  // };
  // validate: (value: string) => string;
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
