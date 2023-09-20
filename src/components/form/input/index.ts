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
  //   validate: (value: string) => string;
  // };
  validate: () => string;
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

  // validate(name: string) {
  //   const currentInput = this.inputsElements.find(
  //     (input) => input.name === name
  //   );
  //   if (!currentInput) throw new Error("input not found");
  //   currentInput.validate();
  // }

  // errorElement = this.children.error as Error;

  render() {
    return this.compile(template, { ...this.props });
  }
}
