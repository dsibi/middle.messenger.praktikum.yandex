/* eslint-disable @typescript-eslint/semi */
import iSettings from "./settings.hbs";
import "../../pages/settings/settings.css";
import Handlebars from "handlebars";
import iHeader from "../../components/header/header.hbs";
import iButton from "../../components/button/button.hbs";
import avaPath from "../../../static/img/avatar.png";

Handlebars.registerPartial("header", iHeader);
Handlebars.registerPartial("button", iButton);

document.addEventListener("DOMContentLoaded", () => {
  const fieldsToEdit = [
    { label: "First Name", id: "first_name", value: "Dmitry" },
    { label: "Second Name", id: "second_name", value: "Sib" },
    { label: "Display Name", id: "display_name", value: "Dmitry Sib" },
    { label: "Login", id: "login", value: "dimas" },
    { label: "Email", id: "email", value: "dimas@dimas.world" },
    { label: "Phone", id: "phone", value: "+7-777-777-7777" },
  ];
  const passToEdit = [
    { label: "Old Password", id: "oldPassword" },
    { label: "New Password", id: "newPassword" },
  ];
  const settings = iSettings({
    fieldsToEdit: fieldsToEdit,
    passToEdit: passToEdit,
    avaPath: avaPath,
  });
  const root = document.getElementById("app") as HTMLInputElement;
  const result = settings;
  root.innerHTML = result;

  function editStart(item: HTMLElement): void {
    setColor(item, true);
    setTimeout(setColor, 3000, item, false);
    item.removeAttribute("readonly");
  }

  function setColor(item: HTMLElement, arg: boolean): void {
    if (arg) {
      item.style.backgroundColor = "yellow";
      item.style.borderColor = "red";
    } else {
      item.style.backgroundColor = "white";
      item.style.borderColor = "gray";
    }
  }
  (window as any).editStart = editStart;
});
