import Block from "../../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";
import { Button } from "../../Button";
import { TextInput } from "../../TextInput";
import { isValidMessage } from "../../../utils/validation";

export class MessageBlock extends Block {
  init() {
    this.children.textInput = new TextInput({
      placeholder: "Message...",
      class: style.textInput,
      name: "message",
      events: {
        focusin: (e: Event) => {
          const { value, name } = e.target as HTMLInputElement;
          const isValidValue = isValidMessage(value);
          console.log(name, "is not valid: ", isValidValue);
        },
        focusout: (e: Event) => {
          const { value, name } = e.target as HTMLInputElement;
          const isValidValue = isValidMessage(value);
          isValidValue
            ? console.log(name, "is not valid: ", isValidValue)
            : console.log(name, "is valid: ", isValidValue);
        },
      },
    });
    this.children.submitButton = new Button({
      label: "",
      class: style.submitButton,
      type: "submit",
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const { value, name } = this.children.textInput as TextInput;
          const isValidValue = isValidMessage(value);
          isValidValue
            ? console.log("is not valid: ", isValidValue)
            : console.log("is valid: ", isValidValue);

          console.log({ [name]: value });
        },
      },
    });
  }

  render() {
    return this.compile(template, { style });
  }
}
