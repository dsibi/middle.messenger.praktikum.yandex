/* eslint-disable @typescript-eslint/semi */
import Block from "../../utils/Block";
import { renderDom } from "../../utils/renderDom";
import template from "./template.hbs";
import style from "./style.module.css";
import { Form } from "../../components/Form";
import { Header } from "../../components/Header";
import { Button, ButtonProps } from "../../components/Button";

class RegistationFields {
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

const regFields: RegistationFields[] = [
  new RegistationFields("first_name", "First Name", "Dmitry"),
  new RegistationFields("second_name", "Second Name", "Sib"),
  new RegistationFields("login", "Login", "dimas"),
  new RegistationFields("email", "Email", "dimas@dimas.world"),
  new RegistationFields("password", "Password", "dimas.world"),
  new RegistationFields("phone", "Phone", "+7-777-777-7777"),
];

export interface RegistrationPageProps {
  button: ButtonProps;
}

export class RegistrationPage extends Block<RegistrationPageProps> {
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
