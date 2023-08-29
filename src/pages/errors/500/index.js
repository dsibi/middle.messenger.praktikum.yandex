import er500 from "./tmpl.hbs";
import error from "../../../components/error/tmpl.hbs";
import errorPath from "../../../static/img/problem.png";
import Handlebars from "handlebars/runtime";
import "./style.scss";
import "../../../components/error/style.scss";

Handlebars.registerPartial({
  error: error,
});

const page = er500({
  errorPath: errorPath,
  desc: "Error 500 - server is unavailable",
});

document.getElementById("app").innerHTML = page;
