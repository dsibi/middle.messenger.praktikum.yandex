import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import Logo, { LogoProps } from "../../components/logo/index";
import Form, { FormProps } from "../../components/form/index";
import Link, { LinkProps } from "../../components/link/index";
import Button, { ButtonProps } from "../../components/button/index";
import { inputsData } from "../../data/auth";

export interface AuthPageProps {
  logo: LogoProps;
  form: FormProps;
  link: LinkProps;
  signInBtn: ButtonProps;
  signUpBtn: ButtonProps;
}

export default class AuthPage extends Block<AuthPageProps> {
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
      link: new Link({ linkText: "Forgot password?" }),
      signInBtn: new Button({
        id: "signIn",
        label: "Sign In",
      }),
      signUpBtn: new Button({
        id: "signUp",
        label: "Sign Up",
      }),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
