/* eslint-disable @typescript-eslint/semi */
import { overOutField, onClickField } from "./inputFields";
import "./auth.css";
import iHeader from "../../components/header/header.hbs";
import iButton from "../../components/button.hbs";
import auth from "../../pages/auth.hbs";
import Handlebars from "handlebars";

Handlebars.registerPartial("header", iHeader);
Handlebars.registerPartial("button", iButton);

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app") as HTMLInputElement;
  const result = auth();
  root.innerHTML = result;

  const lgField: HTMLElement | null = document.getElementById("login");
  const pwField: HTMLElement | null = document.getElementById("password");

  overOutField(lgField as HTMLSelectElement);
  onClickField(lgField as HTMLSelectElement);

  overOutField(pwField as HTMLSelectElement);
});
