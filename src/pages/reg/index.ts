/* eslint-disable @typescript-eslint/semi */
import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";
import { Form } from "../../components/Form";
import { FormInputProps } from "../../components/Form/FormInput";
import { Header } from "../../components/Header";
import { Button, ButtonProps } from "../../components/Button";
import {
  isValidLogin,
  isValidEmail,
  isValidName,
  isValidPhone,
  isValidPassword,
} from "../../utils/validation";
import router from "../../utils/Router";
import { PATHNAMES } from "../../utils/paths";

class RegistationField implements FormInputProps {
  for: string;
  label: string;
  name: string;
  type: string;
  id: string;
  error?: string | undefined;
  events!: { click: () => void };
  validate: (value: string) => string;
  constructor(id: string, label: string, validate: (value: string) => string) {
    this.for = id;
    this.label = label;
    this.id = id;
    this.type = id;
    this.name = id;
    this.validate = validate;
  }
}

const regFields: RegistationField[] = [
  new RegistationField("first_name", "First Name", isValidName),
  new RegistationField("second_name", "Second Name", isValidName),
  new RegistationField("display_name", "Display Name", isValidName),
  new RegistationField("login", "Login", isValidLogin),
  new RegistationField("email", "Email", isValidEmail),
  new RegistationField("phone", "Phone", isValidPhone),
  new RegistationField("password", "Password", isValidPassword),
  new RegistationField("password_conf", "Confirm password", isValidPassword),
];

export interface RegistrationPageProps {
  button: ButtonProps;
}

function authController(data: {}) {
  const host = "https://ya-praktikum.tech";

  fetch(`${host}/api/v2/auth/signup`, {
    method: "POST",
    credentials: "include", // Нужно подставлять куки
    mode: "cors", // Работаем с CORS
    headers: {
      "content-type": "application/json", // Данные отправляем в формате JSON
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.text()) // Можно вытащить через .json()
    .then((data) => {
      console.log(data);
      return data;
    })
    .then(() => {
      fetch(`${host}/api/v2/auth/user`, {
        // Получаем подробную информацию о пользователе и проверяем, что куки проставились
        method: "GET",
        mode: "cors",
        credentials: "include",
      }).then((response) => {
        // return response.json();
        if (response.status == 200 || response.status == 400) {
          router.go(PATHNAMES.CHAT_PATH);
          // console.log("Go!!!");
        }
      });
      // .then((data) => {
      //   console.log("user", data);
      // });
    });
}

export class RegistrationPage extends Block<RegistrationPageProps> {
  form = this.children.form as Form;

  init() {
    this.children.header = new Header();
    this.children.form = new Form({
      inputs: regFields.map((regField) => ({
        ...regField,
        events: {
          focusin: () => this.form.validate(regField.name),
          focusout: () => this.form.validate(regField.name),
        },
      })),
    });
    this.children.button = new Button({
      label: "Register",
      class: style.button,
      events: {
        click: () => {
          // click: (e: Event) => {
          // router.go(PATHNAMES.CHAT_PATH), e.preventDefault();
          const isValid = this.form.isValid();
          const values = this.form.getValues();
          if (isValid && values) {
            authController(values);
          }
          console.log("form is valid: ", isValid);
          console.log(values);
        },
      },
    });
  }

  render() {
    return this.compile(template, { style });
  }
}
