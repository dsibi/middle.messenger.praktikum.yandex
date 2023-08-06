/* eslint-disable @typescript-eslint/semi */
import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";
import { Form } from "../../components/Form";
import { Header } from "../../components/Header";
import { Button, ButtonProps } from "../../components/Button";
import { Link } from "../../components/Link";
import { isValidLogin, isValidPassword } from "../../utils/validation";
import callMethod from "../../utils/ApiClient";
import { PATHNAMES } from "../../utils/paths";
import router from "../../utils/Router";

const inputs: Array<{
  for: string;
  label: string;
  name: string;
  type: string;
  error: string;
  value: string;
  validate: (value: string) => string;
}> = [
  {
    for: "login",
    label: "Login",
    name: "login",
    type: "text",
    error: "",
    value: "",
    validate: isValidLogin,
  },
  {
    for: "password",
    label: "Password",
    name: "password",
    type: "password",
    error: "",
    value: "",
    validate: isValidPassword,
  },
];

export interface AuthorizationPageProps {
  firstButton: ButtonProps;
  secondButton: ButtonProps;
  forgot: Link;
}

export class AuthorizationPage extends Block<AuthorizationPageProps> {
  form = this.children.form as Form;

  init() {
    this.children.header = new Header();
    this.children.form = new Form({
      inputs: inputs.map((input) => ({
        ...input,
        events: {
          focusin: () => this.form.validate(input.name),
          focusout: () => this.form.validate(input.name),
        },
      })),
    });
    this.children.firstButton = new Button({
      label: "Log In",
      class: style.login,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const isValid = this.form.isValid();
          const values = this.form.getValues();
          console.log("form is valid: ", isValid);
          console.log(values);
          if (isValid && values) {
            callMethod("signin", PATHNAMES.CHAT_PATH, values);
          }
        },
      },
    });
    this.children.secondButton = new Button({
      label: "Sign Up",
      type: "button",
      class: style.signup,
      events: {
        click: () => router.go(PATHNAMES.SIGNUP_PATH),
      },
    });
    this.children.forgot = new Link({
      text: "Forgot password",
      events: {
        click: () => router.go(PATHNAMES.PATH_NOT_FOUND),
      },
    });
  }

  render() {
    return this.compile(template, { style });
  }
}
