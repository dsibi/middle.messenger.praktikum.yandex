import iMain from "../../pages/main/main.hbs";
import "../../pages/main/main.css";
import iHeader from "../../components/header/header.hbs";
import iButton from "../../components/button/button.hbs";
import logoPath from "../../../static/img/logo.png";
import regPage from "/pages/reg/reg";
import Handlebars from "handlebars";

Handlebars.registerPartial("header", iHeader);
Handlebars.registerPartial("button", iButton);

export default function mainPage() {
  const main = iMain({ logoPath: logoPath });
  const root = document.getElementById("app");
  const result = main;
  root.innerHTML = result;

  function openReg() {
    regPage();
  }
}
