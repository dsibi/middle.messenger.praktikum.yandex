import er404 from "./tmpl.hbs";
import error from "../../../components/error/tmpl.hbs";
import errorPath from "../../../static/img/error-404.png";
import Handlebars from "handlebars/runtime";
import "./style.scss";
import "../../../components/error/style.scss";

Handlebars.registerPartial({
  error: error,
});

const page = er404({
  errorPath: errorPath,
  desc: "Error 404 - page does not exist",
});

document.getElementById("app").innerHTML = page;
