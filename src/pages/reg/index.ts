import reg from "./tmpl.hbs";
import logo from "../../components/appLogo/tmpl.hbs";
import logoPath from "../../static/img/logo.png";
import form from "../../components/form/tmpl.hbs";
import inputs from "../../components/form/input/tmpl.hbs";
import button from "../../components/button/tmpl.hbs";
import Handlebars from "handlebars/runtime";
import "./style.scss";
import "../../components/form/style.scss";
import "../../components/form/input/style.scss";
import "../../components/button/style.scss";

Handlebars.registerPartial({
  logo: logo,
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
  logoPath: logoPath,
  input: inputsData,
  regBtn: {
    id: "regBtn",
    label: "Registration",
  },
});

document.getElementById("app")!.innerHTML = page;
