import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import Avatar from "../../components/avatar";
import Form from "../../components/form";
import Button from "../../components/button";

const inputsData = [
  {
    for: "first_name",
    label: "First Name",
    name: "first_name",
    type: "text",
    error: "",
    value: "Dmitry",
    // validate: isValidLogin,
  },
  {
    for: "second_name",
    label: "Second Name",
    name: "second_name",
    type: "text",
    error: "",
    value: "Sib",
    // validate: isValidPassword,
  },
  {
    for: "login",
    label: "Login",
    name: "login",
    type: "text",
    error: "",
    value: "DmSib",
    // validate: isValidPassword,
  },
  {
    for: "email",
    label: "Email",
    name: "email",
    type: "text",
    error: "",
    value: "dmsib@dmsib.ru",
    // validate: isValidPassword,
  },
  {
    for: "phone",
    label: "Phone",
    name: "phone",
    type: "text",
    error: "",
    value: "+7-777-777-7777",
    // validate: isValidPassword,
  },
  {
    for: "password",
    label: "Old password",
    name: "oldPassword",
    type: "password",
    error: "",
    value: "Qwerty12345",
    // validate: isValidPassword,
  },
  {
    for: "password",
    label: "New password",
    name: "newPassword",
    type: "password",
    error: "",
    value: "Qwerty12345",
    // validate: isValidPassword,
  },
];

export default class PfPage extends Block {
  init() {
    this.children.avaProps = new Avatar();
    this.children.form = new Form({
      input: inputsData.map((input) => ({
        ...input,
        events: {
          // focusin: () => this.form.validate(input.name),
          // focusout: () => this.form.validate(input.name),
        },
      })),
    });
    this.children.confirmBtn = new Button({
      id: "confirm",
      label: "Confirm",
    });
    this.children.cancelBtn = new Button({
      id: "cancel",
      label: "Cancel",
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

// const page = pf({
//   avaProps: {
//     avaPath: avaPath,
//   },
//   input: inputsData,
//   confirmBtn: {
//     id: "confirm",
//     label: "Confirm",
//   },
//   cancelBtn: {
//     id: "cancel",
//     label: "Cancel",
//   },
// });

// document.getElementById("app")!.innerHTML = page;
