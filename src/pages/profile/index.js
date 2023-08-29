import pf from "./tmpl.hbs";
import ava from "../../components/avatar/tmpl.hbs";
import avaPath from "../../static/img/avatar.png";
import form from "../../components/form/tmpl.hbs";
import inputs from "../../components/form/input/tmpl.hbs";
import button from "../../components/button/tmpl.hbs";
import Handlebars from "handlebars/runtime";
import "./style.scss";
import "../../components/avatar/style.scss";
import "../../components/form/style.scss";
import "../../components/form/input/style.scss";
import "../../components/button/style.scss";

Handlebars.registerPartial({
  ava: ava,
  form: form,
  inputs: inputs,
  button: button,
});

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

const page = pf({
  avaProps: {
    avaPath: avaPath,
  },
  input: inputsData,
  confirmBtn: {
    id: "confirm",
    label: "Confirm",
  },
  cancelBtn: {
    id: "cancel",
    label: "Cancel",
  },
});

document.getElementById("app").innerHTML = page;
