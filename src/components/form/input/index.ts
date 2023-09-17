import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export interface InputProps {
  for: string;
  label: string;
  name: string;
  type: string;
  error?: string;
  // events: {
  //   click: () => void;
  // };
  // validate: (value: string) => string;
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super(props);
    props.for = props.name;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
