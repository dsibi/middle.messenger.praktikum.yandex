import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import Avatar, { AvaProps } from "../../components/avatar";
import path from "../../static/img/avatar.png";
import Form, { FormProps } from "../../components/form/index";
import Button, { ButtonProps } from "../../components/button/index";
import { inputsData } from "../../data/profile";

export interface PfPageProps {
  myAva: AvaProps;
  form: FormProps;
  confirmBtn: ButtonProps;
  cancelBtn: ButtonProps;
}

export default class PfPage extends Block<PfPageProps> {
  constructor() {
    super({
      myAva: new Avatar({
        avaPath: path,
        altText: "My Ava",
      }),
      form: new Form({
        input: inputsData.map((input) => ({
          ...input,
          events: {
            // focusin: () => this.form.validate(input.name),
            // focusout: () => this.form.validate(input.name),
          },
        })),
      }),
      confirmBtn: new Button({
        id: "confirm",
        label: "Confirm",
      }),
      cancelBtn: new Button({
        id: "cancel",
        label: "Cancel",
      }),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
