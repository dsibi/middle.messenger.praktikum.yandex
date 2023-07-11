/* eslint-disable @typescript-eslint/semi */
// import { overOutField, onClickField } from "./inputFields";
import "./auth.css";
import iHeader from "../../components/header/header.hbs";
import iButton from "../../components/button.hbs";
import auth from "../../pages/auth.hbs";
import Handlebars from "handlebars";

Handlebars.registerPartial("header", iHeader);
Handlebars.registerPartial("button", iButton);

// const lgField: HTMLElement | boolean =
//   document.getElementById("login") ?? false;
// const pwField: HTMLElement | boolean =
//   document.getElementById("password") ?? false;

// overOutField(lgField as HTMLSelectElement);
// onClickField(lgField as HTMLSelectElement);

// overOutField(pwField as HTMLSelectElement);

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app") as HTMLInputElement;
  const result = auth({ value: "DDDDdsfsd" });
  root.innerHTML = result;
});
