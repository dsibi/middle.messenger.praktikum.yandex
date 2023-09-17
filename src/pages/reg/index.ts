import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { InputProps } from "../../components/form/input/index";
import Logo, { LogoProps } from "../../components/logo/index";
import Form, { FormProps } from "../../components/form/index";
import Button, { ButtonProps } from "../../components/button/index";

const inputsData: InputProps[] = [
  {
    label: "First Name",
    name: "first_name",
    type: "text",
    error: "",
    value: "",
    // validate: isValidLogin,
  },
  {
    label: "Second Name",
    name: "second_name",
    type: "text",
    error: "",
    value: "",
    // validate: isValidPassword,
  },
  {
    label: "Login",
    name: "login",
    type: "text",
    error: "",
    value: "",
    // validate: isValidPassword,
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    error: "",
    value: "",
    // validate: isValidPassword,
  },
  {
    label: "Phone",
    name: "phone",
    type: "text",
    error: "",
    value: "",
    // validate: isValidPassword,
  },
  {
    label: "Password",
    name: "password",
    type: "text",
    error: "",
    value: "",
    // validate: isValidPassword,
  },
  {
    label: "Password (repeat)",
    name: "password",
    type: "text",
    error: "",
    value: "",
    // validate: isValidPassword,
  },
];

export interface RegPageProps {
  logo: LogoProps;
  form: FormProps;
  regBtn: ButtonProps;
}

export default class RegPage extends Block<RegPageProps> {
  constructor() {
    super({
      logo: new Logo(),
      form: new Form({
        input: inputsData.map((input) => ({
          ...input,
          events: {
            // focusin: () => this.form.validate(input.name),
            // focusout: () => this.form.validate(input.name),
          },
        })),
      }),
      regBtn: new Button({
        id: "regBtn",
        label: "Registration",
      }),
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
