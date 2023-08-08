/* eslint-disable @typescript-eslint/semi */
import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";
import { Form } from "../../components/Form";
import { FormInputProps } from "../../components/Form/FormInput";
import { Header } from "../../components/Header";
import { Avatar } from "../../components/Avatar";
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
import { callPutMethod } from "../../Api/Profile";

class ProfileField implements FormInputProps {
  for: string;
  label: string;
  name: string;
  type: string;
  id?: number;
  value?: string;
  error?: string | undefined;
  events!: { click: () => void };
  validate: (value: string) => string;
  constructor(
    name: string,
    label: string,
    validate: (value: string) => string
  ) {
    this.for = name;
    this.label = label;
    this.type = name;
    this.name = name;
    this.validate = validate;
  }
}

const userFields: ProfileField[] = [
  new ProfileField("first_name", "First Name", isValidName),
  new ProfileField("second_name", "Second Name", isValidName),
  new ProfileField("display_name", "Display Name", isValidName),
  new ProfileField("login", "Login", isValidLogin),
  new ProfileField("email", "Email", isValidEmail),
  new ProfileField("phone", "Phone", isValidPhone),
];

const passFields: ProfileField[] = [
  new ProfileField("oldPassword", "Old Password", isValidPassword),
  new ProfileField("newPassword", "New Password", isValidPassword),
];

let avaPath = "";

export function fillFields(data: any) {
  for (const key in data) {
    let index = userFields.findIndex((obj) => obj.name == key);
    if (userFields[index] != undefined) {
      userFields[index].value = data[key];
    }
  }
  avaPath = data.avatar;
}

export interface ProfilePagePageProps {
  save: ButtonProps;
  cancel: ButtonProps;
}

export class ProfilePage extends Block<ProfilePagePageProps> {
  userForm = this.children.userFieldsForm as Form;
  passForm = this.children.passFieldsForm as Form;

  init() {
    this.children.header = new Header();
    this.children.avatar = new Avatar({
      avaPath: `https://ya-praktikum.tech/api/v2/resources${avaPath}`,
      width: "100px",
    });
    this.children.userFieldsForm = new Form({
      inputs: userFields.map((userField) => ({
        ...userField,
        events: {
          focusin: () => this.userForm.validate(userField.name),
          focusout: () => this.userForm.validate(userField.name),
        },
      })),
    });
    this.children.saveUserFields = new Button({
      label: "Save",
      class: style.button,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const isValid = this.userForm.isValid();
          const data = this.userForm.getValues();
          console.log("form is valid: ", isValid);
          console.log(data);
          callPutMethod("profile", data, PATHNAMES.CHAT_PATH);
        },
      },
    });
    this.children.cancelUserFields = new Button({
      label: "Cancel",
      events: {
        click: () => router.go(PATHNAMES.CHAT_PATH),
      },
      class: style.button,
    });
    this.children.passFieldsForm = new Form({
      inputs: passFields.map((passField) => ({
        ...passField,
        events: {
          focusin: () => this.passForm.validate(passField.name),
          focusout: () => this.passForm.validate(passField.name),
        },
      })),
    });
    this.children.savePassFields = new Button({
      label: "Save",
      class: style.button,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const isValid = this.passForm.isValid();
          const data = this.passForm.getValues();
          console.log("form is valid: ", isValid);
          console.log(data);
          callPutMethod("password", data, PATHNAMES.CHAT_PATH);
        },
      },
    });
    this.children.cancelPassFields = new Button({
      label: "Cancel",
      events: {
        click: () => router.go(PATHNAMES.CHAT_PATH),
      },
      class: style.button,
    });
  }

  render() {
    // console.log(this.children.form.inputsElements);
    return this.compile(template, { style });
  }
}
