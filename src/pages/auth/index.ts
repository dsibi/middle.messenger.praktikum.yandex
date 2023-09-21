import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Logo, LogoProps } from "../../components/logo/index";
import { Form, FormProps } from "../../components/form/index";
import { Link, LinkProps } from "../../components/link/index";
import { Button, ButtonProps } from "../../components/button/index";
import { inputsData } from "../../data/auth";
import { renderDom } from "../../utils/renderDom";

export interface AuthPageProps {
  logo: LogoProps;
  form: FormProps;
  link: LinkProps;
  signInBtn: ButtonProps;
  signUpBtn: ButtonProps;
}

export default class AuthPage extends Block<AuthPageProps> {
  constructor() {
    let form = new Form({
      input: inputsData.map((input) => ({
        ...input,
      })),
    });
    super({
      logo: new Logo(),
      form: form,
      link: new Link({
        linkText: "Forgot password?",
        events: {
          click: () => renderDom("errorPage404"),
        },
      }),
      signInBtn: new Button({
        id: "signIn",
        label: "Sign In",
        // events: {
        //   click: () => renderDom("chatsPage"),
        // },
        events: {
          click: () => {
            const data = form.getValues();
            console.log(data);
            const isValid = form.isValid();
            console.log("form is valid: ", isValid);
          },
        },
      }),
      signUpBtn: new Button({
        id: "signUp",
        label: "Sign Up",
        events: {
          click: () => renderDom("registrationPage"),
        },
      }),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
