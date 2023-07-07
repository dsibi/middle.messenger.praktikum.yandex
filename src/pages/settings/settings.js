import iSettings from "../../pages/settings/settings.hbs";
import "../../pages/settings/settings.css";
import { editStart, setColor } from "../../modules/settings";
import iHeader from "../../components/header/header.hbs";
import iButton from "../../components/button/button.hbs";
import avaPath from "../../../static/img/avatar.png";
import logoPath from "../../../static/img/logo.png";
import Handlebars from "handlebars";

Handlebars.registerPartial("header", iHeader);
Handlebars.registerPartial("button", iButton);

export default function mainPage() {
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
    logoPath: logoPath,
    fieldsToEdit: fieldsToEdit,
    passToEdit: passToEdit,
    avaPath: avaPath,
  });
  const root = document.getElementById("app");
  const result = settings;
  root.innerHTML = result;
}
