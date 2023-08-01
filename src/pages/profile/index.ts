/* eslint-disable @typescript-eslint/semi */
import Block from "../../utils/Block";
// import { renderDom } from "../../utils/renderDom";
import template from "./template.hbs";
import style from "./style.module.css";
import { Form } from "../../components/Form";
import { FormInputProps } from "../../components/Form/FormInput";
import { Header } from "../../components/Header";
import { Avatar } from "../../components/Avatar";
import avaPath from "../../../static/img/avatar.png";
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

class ProfileField implements FormInputProps {
  for: string;
  label: string;
  name: string;
  type: string;
  id: string;
  value: string;
  error?: string | undefined;
  events!: { click: () => void };
  validate: (value: string) => string;
  constructor(
    id: string,
    label: string,
    value: string,
    validate: (value: string) => string
  ) {
    this.for = id;
    this.label = label;
    this.id = id;
    this.value = value;
    this.type = id;
    this.name = id;
    this.validate = validate;
  }
}

const pfFields: ProfileField[] = [
  new ProfileField("first_name", "First Name", "Dmitry", isValidName),
  new ProfileField("second_name", "Second Name", "Sib", isValidName),
  new ProfileField("display_name", "Display Name", "Dmitry Sib", isValidName),
  new ProfileField("login", "Login", "dimas", isValidLogin),
  new ProfileField("email", "Email", "dimas@dimas.world", isValidEmail),
  new ProfileField("phone", "Phone", "+7-777-777-7777", isValidPhone),
  new ProfileField("old_password", "Old Password", "********", isValidPassword),
  new ProfileField("new_password", "New Password", "********", isValidPassword),
];

export interface ProfilePagePageProps {
  save: ButtonProps;
  cancel: ButtonProps;
}

// console.log(regFields);

export class ProfilePage extends Block<ProfilePagePageProps> {
  form = this.children.form as Form;

  init() {
    this.children.header = new Header();
    this.children.avatar = new Avatar({ avaPath: avaPath, width: "100px" });
    this.children.form = new Form({
      inputs: pfFields.map((pfField) => ({
        ...pfField,
        events: {
          focusin: () => this.form.validate(pfField.name),
          focusout: () => this.form.validate(pfField.name),
        },
      })),
    });
    this.children.save = new Button({
      label: "Save",
      class: style.button,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const isValid = this.form.isValid();
          const data = this.form.getValues();
          console.log("form is valid: ", isValid);
          console.log(data);
        },
      },
    });
    this.children.cancel = new Button({
      label: "Cancel",
      events: {
        click: () => router.go(PATHNAMES.SIGNIN_PATH),
      },
      class: style.button,
    });
  }

  render() {
    // console.log(this.children.form.inputsElements);
    return this.compile(template, { style });
  }
}
