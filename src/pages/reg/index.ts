/* eslint-disable @typescript-eslint/semi */
import Block from "../../utils/Block";
import { renderDom } from "../../utils/renderDom";
import template from "./template.hbs";
import style from "./style.module.css";
import { Form } from "../../components/Form";
import { Header } from "../../components/Header";
import { Button, ButtonProps } from "../../components/Button";

class RegictationFields {
  for: string;
  label: string;
  id: string;
  value: string;
  constructor(id: string, label: string, value: string) {
    this.for = id;
    this.label = label;
    this.id = id;
    this.value = value;
  }
}

const regFields: RegictationFields[] = [
  new RegictationFields("first_name", "First Name", "Dmitry"),
  new RegictationFields("second_name", "Second Name", "Sib"),
  new RegictationFields("login", "Login", "dimas"),
  new RegictationFields("email", "Email", "dimas@dimas.world"),
  new RegictationFields("password", "Password", "dimas.world"),
  new RegictationFields("phone", "Phone", "+7-777-777-7777"),
];

export interface RegistrationPageProps {
  button: ButtonProps;
}

export class RegistrationPage extends Block<RegistrationPageProps> {
  form = this.children.form as Form;

  init() {
    this.children.header = new Header();
    this.children.form = new Form({
      inputs: regFields.map((regField) => ({
        ...regField,
        events: {
          // focusin: () => this.form.validate(input.name),
          // focusout: () => this.form.validate(input.name),
        },
      })),
    });
    this.children.button = new Button({
      label: "Register",
      events: {
        click: () => renderDom("authorizationPage"),
      },
      class: style.button,
    });
  }

  render() {
    return this.compile(template, { style, forgot: style.forgot });
  }
}
