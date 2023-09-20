import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import ErrorEl from "./error";

export interface InputProps {
  label: string;
  name: string;
  type: string;
  errorText?: string;
  value?: string;
  // events: {
  //   // validate: (value: string) => string;
  //   // focusin: (value: string) => string;
  //   // focusout: (value: string) => string;
  // };
  validate: (value: string) => string;
}

export default class Input extends Block<InputProps> {
  inputElement: HTMLInputElement;
  constructor(props: InputProps) {
    super(props);
    this.inputElement = (this.element as HTMLElement)
      .children[1] as HTMLInputElement;
    this.children.error = new ErrorEl({ text: props.errorText });
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
    this.children.error.error = error;
    console.log(error);
    return error;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
