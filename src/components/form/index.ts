import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";
import { FormInput, FormInputProps } from "./FormInput";

export interface FormProps {
  inputs: Array<FormInputProps>;
}

export class Form extends Block<FormProps> {
  inputsElements = this.children.inputs as FormInput[];

  init() {
    this.children.inputs = this.props.inputs.map(
      (input: FormInputProps) => new FormInput(input)
    );
  }

  isValid() {
    return this.inputsElements.reduce(
      (agg, input) => (input.validate().length === 0 ? agg : false),
      true
    );
  }

  getValues() {
    // console.log(this.inputsElements[1].inputElement);
    return this.inputsElements.reduce(
      (agg, input) => ({ ...agg, [input.name]: input.value }),
      {}
    );
  }

  validate(name: string) {
    const currentInput = this.inputsElements.find(
      (input) => input.name === name
    );

    if (!currentInput) throw new Error("input not found");

    currentInput.validate();
  }

  render() {
    return this.compile(template, { style, ...this.props });
  }
}
