import header from "./components/header/header.hbs";
import main from "./pages/main/main.hbs";
import logoPath from "../static/img/logo.png";
import "./default.css";

import Handlebars from "handlebars";
Handlebars.registerPartial("header", header);

const mn = main({ logoPath: logoPath });
// const mn = main();
// const root = document.body;
// const result = hd;
// console.log(hd);
// root.innerHTML = result;

// document.body.prepend(hd);

const root2 = document.getElementById("app");
// console.log(root);
// console.log(root2);
const result2 = mn;
root2.innerHTML = result2;

// var tag = document.createElement("p");
// // console.log(document);
// var text = document.createTextNode("Tutorix is the best e-learning platform");
// tag.appendChild(text);
// var element = document.getElementById("app");
// element.appendChild(tag);
