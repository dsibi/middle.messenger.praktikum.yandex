import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Button, ButtonProps } from "../../button";
import { Text, TextProps } from "./text";
import MessageController from "../../../controllers/Messager-controller";
import smilesPath from "../../../static/img/smile.png";
import attachIconPath from "../../../static/img/attach.png";
import { isValidMessage } from "../../../utils/validation";

export interface InputProps {
  text: TextProps;
  submitButton: ButtonProps;
}

export class Input extends Block {
  constructor() {
    super({
      attachIconPath: attachIconPath,
      smilesPath: smilesPath,
      text: new Text({
        placeholder: "Message...",
        // events: {
        //   focusin: (e: Event) => {
        //     const { value, name } = e.target as HTMLInputElement;
        //     const isValidValue = isValidMessage(value);
        //     console.log(name, "is not valid: ", isValidValue);
        //   },
        //   focusout: (e: Event) => {
        //     const { value, name } = e.target as HTMLInputElement;
        //     const isValidValue = isValidMessage(value);
        //     isValidValue
        //       ? console.log(name, "is not valid: ", isValidValue)
        //       : console.log(name, "is valid: ", isValidValue);
        //   },
        // },
      }),
      submitButton: new Button({
        id: "submit",
        label: ">",
        events: {
          click: (e) => {
            e.preventDefault();
            const { value, name }: any = this.children.text;
            console.log({ value, name });
            if (isValidMessage(value) != "the value cannot be empty") {
              MessageController.sendMessage(value);
            }
          },
        },
      }),
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
