import iAuth from "./reg.hbs";
import "./reg.css";
import { editStart, setColor } from "../../modules/settings";
import iHeader from "../../components/header/header.hbs";
import iButton from "../../components/button/button.hbs";
import logoPath from "../../../static/img/logo.png";
import mainPage from "/pages/main/main";
import Handlebars from "handlebars";

Handlebars.registerPartial("header", iHeader);
Handlebars.registerPartial("button", iButton);

export default function regPage() {
  const fields = [
    { label: "First Name", id: "first_name", value: "Dmitry" },
    { label: "Second Name", id: "second_name", value: "Sib" },
    { label: "Login", id: "login", value: "dimas" },
    { label: "Email", id: "email", value: "dimas@dimas.world" },
    { label: "Password", id: "password", value: "dimas.world" },
    { label: "Phone", id: "phone", value: "+7-777-777-7777" },
  ];
  const auth = iAuth({ logoPath: logoPath, fields: fields });
  const root = document.getElementById("app");
  const result = auth;
  root.innerHTML = result;
}
