import reg from "./tmpl.hbs";
import form from "../../components/form/tmpl.hbs";
import inputs from "../../components/form/input/tmpl.hbs";
import button from "../../components/button/tmpl.hbs";
import Handlebars from "handlebars/runtime";
import "./style.scss";
import "../../components/form/style.scss";
import "../../components/form/input/style.scss";
import "../../components/button/style.scss";
import logoPath from "../../static/img/logo.png";

Handlebars.registerPartial({
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

const page = reg({
  input: inputsData,
  regBtn: {
    width: "100%",
    id: "regBtn",
    label: "Registration",
  },
  logoPath: logoPath,
});

document.getElementById("app").innerHTML = page;
