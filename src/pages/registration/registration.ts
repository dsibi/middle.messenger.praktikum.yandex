/* eslint-disable @typescript-eslint/semi */
import registration from "./registration.hbs";
import { overOutField, onClickField } from "../../modules/fields/inputFields";
import Handlebars from "handlebars";
import iHeader from "../../components/header/header.hbs";
import iButton from "../../components/button/button.hbs";

Handlebars.registerPartial("header", iHeader);
Handlebars.registerPartial("button", iButton);

document.addEventListener("DOMContentLoaded", () => {
  const fields: object[] = [
    { label: "First Name", id: "first_name", value: "Dmitry" },
    { label: "Second Name", id: "second_name", value: "Sib" },
    { label: "Login", id: "login", value: "dimas" },
    { label: "Email", id: "email", value: "dimas@dimas.world" },
    { label: "Password", id: "password", value: "dimas.world" },
    { label: "Phone", id: "phone", value: "+7-777-777-7777" },
  ];
  const root = document.getElementById("app") as HTMLInputElement;
  const result = registration({ fields: fields });
  root.innerHTML = result;

  const lgField: HTMLElement | null = document.getElementById("login");
  const pwField: HTMLElement | null = document.getElementById("password");

  overOutField(lgField as HTMLSelectElement);
  onClickField(lgField as HTMLSelectElement);

  overOutField(pwField as HTMLSelectElement);
});
