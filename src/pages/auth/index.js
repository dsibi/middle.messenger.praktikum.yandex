import auth from "./tmpl.hbs";
import logo from "../../components/appLogo/tmpl.hbs";
import logoPath from "../../static/img/logo.png";
import form from "../../components/form/tmpl.hbs";
import inputs from "../../components/form/input/tmpl.hbs";
import link from "../../components/link/tmpl.hbs";
import button from "../../components/button/tmpl.hbs";
import Handlebars from "handlebars/runtime";
import "./style.scss";
import "../../components/form/style.scss";
import "../../components/form/input/style.scss";
import "../../components/link/style.scss";
import "../../components/button/style.scss";

Handlebars.registerPartial({
  logo: logo,
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
  logoPath: logoPath,
  input: inputsData,
  linkText: "Forgot password?",
  signInBtn: {
    id: "signIn",
    label: "Sign In",
  },
  signUpBtn: {
    id: "signUp",
    label: "Sign Up",
  },
});

document.getElementById("app").innerHTML = page;
