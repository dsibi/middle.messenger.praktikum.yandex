/* eslint-disable @typescript-eslint/semi */
import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";
import { Form } from "../../components/Form";
import { FormInputProps } from "../../components/Form/FormInput";
import { Header } from "../../components/Header";
import { Button, ButtonProps } from "../../components/Button";

class RegistationField implements FormInputProps {
  for: string;
  label: string;
  name: string;
  type: string;
  id: string;
  constructor(id: string, label: string) {
    this.for = id;
    this.label = label;
    this.id = id;
    this.type = id;
    this.name = id;
  }
}

const regFields: RegistationField[] = [
  new RegistationField("first_name", "First Name"),
  new RegistationField("second_name", "Second Name"),
  new RegistationField("display_name", "Display Name"),
  new RegistationField("login", "Login"),
  new RegistationField("email", "Email"),
  new RegistationField("phone", "Phone"),
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
      class: style.button,
      events: {
        click: () => {
          let data = this.form.getValues();
          console.log(data);
        },
      },
    });
  }

  render() {
    return this.compile(template, { style });
  }
}
