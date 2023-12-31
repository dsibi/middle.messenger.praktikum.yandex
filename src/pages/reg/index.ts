/* eslint-disable @typescript-eslint/semi */
import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";
import { Form } from "../../components/Form";
import { FormInputProps } from "../../components/Form/FormInput";
import { Header } from "../../components/Header";
import { Button, ButtonProps } from "../../components/Button";
import {
  isValidLogin,
  isValidEmail,
  isValidName,
  isValidPhone,
} from "../../utils/validation";

class RegistationField implements FormInputProps {
  for: string;
  label: string;
  name: string;
  type: string;
  id: string;
  error?: string | undefined;
  events!: { click: () => void };
  validate: (value: string) => string;
  constructor(id: string, label: string, validate: (value: string) => string) {
    this.for = id;
    this.label = label;
    this.id = id;
    this.type = id;
    this.name = id;
    this.validate = validate;
  }
}

const regFields: RegistationField[] = [
  new RegistationField("first_name", "First Name", isValidName),
  new RegistationField("second_name", "Second Name", isValidName),
  new RegistationField("display_name", "Display Name", isValidName),
  new RegistationField("login", "Login", isValidLogin),
  new RegistationField("email", "Email", isValidEmail),
  new RegistationField("phone", "Phone", isValidPhone),
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
          focusin: () => this.form.validate(regField.name),
          focusout: () => this.form.validate(regField.name),
        },
      })),
    });
    this.children.button = new Button({
      label: "Register",
      class: style.button,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const isValid = this.form.isValid();
          const data = this.form.getValues();
          console.log("form is valid: ", isValid);
          console.log(data);
        },
      },
    });
  }

  render() {
    return this.compile(template, { style });
  }
}
