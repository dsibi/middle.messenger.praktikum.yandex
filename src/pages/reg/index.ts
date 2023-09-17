import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import Logo from "../../components/appLogo/index";
import Form from "../../components/form/index";
import Button from "../../components/button/index";

const inputsData = [
  {
    for: "first_name",
    label: "First Name",
    name: "first_name",
    type: "text",
    error: "",
    value: "",
    // validate: isValidLogin,
  },
  {
    for: "second_name",
    label: "Second Name",
    name: "second_name",
    type: "text",
    error: "",
    value: "",
    // validate: isValidPassword,
  },
  {
    for: "login",
    label: "Login",
    name: "login",
    type: "text",
    error: "",
    value: "",
    // validate: isValidPassword,
  },
  {
    for: "email",
    label: "Email",
    name: "email",
    type: "text",
    error: "",
    value: "",
    // validate: isValidPassword,
  },
  {
    for: "phone",
    label: "Phone",
    name: "phone",
    type: "text",
    error: "",
    value: "",
    // validate: isValidPassword,
  },
  {
    for: "password",
    label: "Password",
    name: "password",
    type: "text",
    error: "",
    value: "",
    // validate: isValidPassword,
  },
  {
    for: "password",
    label: "Password (repeat)",
    name: "password",
    type: "text",
    error: "",
    value: "",
    // validate: isValidPassword,
  },
];

export default class RegPage extends Block {
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
    this.children.regBtn = new Button({
      id: "regBtn",
      label: "Registration",
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
