import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import Avatar, { AvaProps } from "../../components/avatar";
import Form, { FormProps } from "../../components/form/index";
import Button, { ButtonProps } from "../../components/button/index";

const inputsData = [
  {
    label: "First Name",
    name: "first_name",
    type: "text",
    error: "",
    value: "Dmitry",
    // validate: isValidLogin,
  },
  {
    label: "Second Name",
    name: "second_name",
    type: "text",
    error: "",
    value: "Sib",
    // validate: isValidPassword,
  },
  {
    label: "Login",
    name: "login",
    type: "text",
    error: "",
    value: "DmSib",
    // validate: isValidPassword,
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    error: "",
    value: "dmsib@dmsib.ru",
    // validate: isValidPassword,
  },
  {
    label: "Phone",
    name: "phone",
    type: "text",
    error: "",
    value: "+7-777-777-7777",
    // validate: isValidPassword,
  },
  {
    label: "Old password",
    name: "oldPassword",
    type: "password",
    error: "",
    value: "Qwerty12345",
    // validate: isValidPassword,
  },
  {
    label: "New password",
    name: "newPassword",
    type: "password",
    error: "",
    value: "Qwerty12345",
    // validate: isValidPassword,
  },
];

export interface PfPageProps {
  avaProps: AvaProps;
  form: FormProps;
  confirmBtn: ButtonProps;
  cancelBtn: ButtonProps;
}

export default class PfPage extends Block<PfPageProps> {
  constructor() {
    super({
      avaProps: new Avatar(),
      form: new Form({
        input: inputsData.map((input) => ({
          ...input,
          events: {
            // focusin: () => this.form.validate(input.name),
            // focusout: () => this.form.validate(input.name),
          },
        })),
      }),
      confirmBtn: new Button({
        id: "confirm",
        label: "Confirm",
      }),
      cancelBtn: new Button({
        id: "cancel",
        label: "Cancel",
      }),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
