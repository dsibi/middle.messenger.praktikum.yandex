import auth from "./tmpl.hbs";
import form from "../../components/form/tmpl.hbs";
import inputs from "../../components/form/input/tmpl.hbs";
import link from "../../components/link/tmpl.hbs";
import button from "../../components/button/tmpl.hbs";
import Handlebars from "handlebars/runtime";
import "./style.scss";

Handlebars.registerPartial({
  form: form,
  inputs: inputs,
  link: link,
  button: button,
});

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

const page = auth({
  input: inputsData,
  linkText: "Forgot password?",
  signInBtn: {
    width: "100%",
    id: "signIn",
    label: "Sign In",
  },
  signUpBtn: {
    width: "100%",
    id: "signUp",
    label: "Sign Up",
  },
});

document.getElementById("app").innerHTML = page;
