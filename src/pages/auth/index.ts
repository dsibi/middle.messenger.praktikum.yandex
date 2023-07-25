/* eslint-disable @typescript-eslint/semi */
import Block from "../../utils/Block";
import { renderDom } from "../../utils/renderDom";
import template from "./template.hbs";
import style from "./style.module.css";
import { Form } from "../../components/Form";
import { Header } from "../../components/Header";
import { Button, ButtonProps } from "../../components/Button";
import { Link } from "../../components/Link";

const inputs: Array<{
  for: string;
  label: string;
  name: string;
  type: string;
  error: string;
}> = [
  {
    for: "login",
    label: "Login",
    name: "login",
    type: "text",
    error: "",
  },
  {
    for: "password",
    label: "Password",
    name: "password",
    type: "password",
    error: "",
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
          // focusin: () => this.form.validate(input.name),
          // focusout: () => this.form.validate(input.name),
        },
      })),
    });
    this.children.firstButton = new Button({
      label: "Log In",
      class: style.login,
      events: {
        click: () => renderDom("chatsPage"),
        // click: (e: Event) => {
        //   e.preventDefault();
        //   const isValid = this.form.isValid();
        //   const data = this.form.getValues();
        //   console.log("form is valid: ", isValid);
        //   console.log(data);

        // },
      },
    });
    this.children.secondButton = new Button({
      label: "Sign Up",
      type: "button",
      class: style.signup,
      events: {
        click: () => renderDom("registrationPage"),
      },
    });
    this.children.forgot = new Link({
      text: "Forgot password",
      events: {
        click: () => renderDom("errorPage404"),
      },
    });
  }

  render() {
    return this.compile(template, { style });
  }
}
