import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Error } from "./error";

export interface InputProps {
  label: string;
  name: string;
  type: string;
  errorText?: string;
  value?: string;
  validate?: (value: string) => string;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({ ...props });
  }

  protected init(): void {
    this.children.error = new Error({ text: this.props.errorText });
  }

  getHTMLInputElement(): HTMLInputElement {
    return (this.element as HTMLElement).children[1] as HTMLInputElement;
  }

  get value() {
    return this.getHTMLInputElement().value;
  }

  get name() {
    return ((this.element as HTMLElement).children[1] as HTMLInputElement).name;
  }

  get isValid() {
    return this.props.validate(this.getHTMLInputElement().value);
  }

  validate() {
    const error = this.props.validate(this.getHTMLInputElement().value);
    (this.children.error as Block<any>).error = error;
    return error;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
