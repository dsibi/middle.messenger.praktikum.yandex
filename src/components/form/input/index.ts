import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import ErrorEl from "./error";

export interface InputProps {
  label: string;
  name: string;
  type: string;
  error?: string;
  value?: string;
  // events: {
  //   validate: (value: string) => string;
  // };
  validate: (value: string) => string;
}

export default class Input extends Block<InputProps> {
  inputElement: HTMLInputElement;
  constructor(props: InputProps) {
    super(props);
    this.inputElement = (this.element as HTMLElement)
      .children[1] as HTMLInputElement;
  }

  get value() {
    return this.inputElement.value;
  }

  get name() {
    return this.inputElement.name;
  }

  get isValid() {
    return this.props.validate(this.inputElement.value);
  }

  validate() {
    const error = this.props.validate(this.inputElement.value);
    this.props.error = error;
    return error;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
