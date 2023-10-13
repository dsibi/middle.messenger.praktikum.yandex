import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Input, InputProps } from "./input";

export interface FormProps {
  input: Array<InputProps>;
}

export class Form extends Block {
  inputElements;
  constructor(props: FormProps) {
    super({ input: props.input.map((input: InputProps) => new Input(input)) });
    this.inputElements = this.children.input;
  }

  getValues() {
    return (this.inputElements as Block<any>[]).reduce(
      (agg, input) => ({
        ...agg,
        [input.name]: input.value,
      }),
      {}
    );
  }

  isValid() {
    return this.inputElements.reduce(
      (agg: any, input: any) => (input.validate().length === 0 ? agg : false),
      true
    );
  }

  validate(name: string) {
    const currentInput = this.inputElements.find(
      (input: any) => input.name === name
    );
    if (!currentInput) throw new Error("input not found");
    currentInput.validate();
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
