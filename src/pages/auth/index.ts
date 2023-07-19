/* eslint-disable @typescript-eslint/semi */
// import { overOutField, onClickField } from "../../modules/fields/inputFields";
import "./auth.css";
import Block from "../../utils/Block";
import iHeader from "../../components/header/header.hbs";
import iButton from "../../components/button/button.hbs";
import auth from "./auth.hbs";
import Handlebars from "handlebars";

Handlebars.registerPartial("header", iHeader);
Handlebars.registerPartial("button", iButton);

export class AuthorizationPage extends Block {
  init() {}
}

// document.addEventListener("DOMContentLoaded", () => {
//     const root = document.getElementById("app") as HTMLInputElement;
//     const result = auth();
//     root.innerHTML = result;

//     const lgField: HTMLElement | null = document.getElementById("login");
//     const pwField: HTMLElement | null = document.getElementById("password");

//     overOutField(lgField as HTMLSelectElement);
//     onClickField(lgField as HTMLSelectElement);

//     overOutField(pwField as HTMLSelectElement);
//   });

// export class ErrorPage extends Block {
//   init() {
//     this.children.button = new Button({
//       label: 'назад к чатам',
//       events: {
//         click: () => renderDom('navigationPage')
//       }
//     })
//   }

//   render() {
//     return this.compile(template, { style, type: '404' })
//   }
// }
