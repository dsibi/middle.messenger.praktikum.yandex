import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import Logo from "../../components/appLogo/index";
import Form from "../../components/form/index";
import Link from "../../components/link/index";
import Button from "../../components/button/index";
import "./style.scss";
import "../../components/form/style.scss";
import "../../components/form/input/style.scss";
import "../../components/link/style.scss";
import "../../components/button/style.scss";

const inputsData = [
  {
    for: "login",
    label: "Login",
    name: "login",
    type: "text",
    error: "",
    value: "",
    // validate: isValidLogin,
  },
  {
    for: "password",
    label: "Password",
    name: "password",
    type: "password",
    error: "",
    value: "",
    // validate: isValidPassword,
  },
];

export default class AuthPage extends Block {
  init() {
    this.children.logo = new Logo();
    this.children.form = new Form({
      input: inputsData.map((input) => ({
        ...input,
        events: {
          // focusin: () => this.form.validate(input.name),
          // focusout: () => this.form.validate(input.name),
        },
      })),
    });
    this.children.link = new Link({ linkText: "Forgot password?" });
    this.children.signInBtn = new Button({
      id: "signIn",
      label: "Sign In",
    });
    this.children.signUpBtn = new Button({
      id: "signUp",
      label: "Sign Up",
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
