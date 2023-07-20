/* eslint-disable @typescript-eslint/semi */
import Block from "../../utils/Block";
import { renderDom } from "../../utils/renderDom";
import template from "./template.hbs";
import style from "./style.module.css";
import { Form } from "../../components/Form";
import { Header } from "../../components/Header";
import { Avatar } from "../../components/Avatar";
import avaPath from "../../../static/img/avatar.png";
import { Button, ButtonProps } from "../../components/Button";

class RegistationFields {
  for: string;
  label: string;
  id: string;
  value: string;
  constructor(id: string, label: string, value: string) {
    this.for = id;
    this.label = label;
    this.id = id;
    this.value = value;
  }
}

const regFields: RegistationFields[] = [
  new RegistationFields("first_name", "First Name", "Dmitry"),
  new RegistationFields("second_name", "Second Name", "Sib"),
  new RegistationFields("display_name", "Display Name", "Dmitry Sib"),
  new RegistationFields("login", "Login", "dimas"),
  new RegistationFields("email", "Email", "dimas@dimas.world"),
  new RegistationFields("phone", "Phone", "+7-777-777-7777"),
];

class PasswordFields {
  for: string;
  label: string;
  id: string;
  constructor(id: string, label: string) {
    this.for = id;
    this.label = label;
    this.id = id;
  }
}

const passFields: PasswordFields[] = [
  new PasswordFields("old_password", "Old Password"),
  new PasswordFields("new_password", "New Password"),
];

export interface ProfilePagePageProps {
  save: ButtonProps;
  cancel: ButtonProps;
}

export class ProfilePage extends Block<ProfilePagePageProps> {
  init() {
    this.children.header = new Header();
    this.children.avatar = new Avatar({ avaPath: avaPath });
    this.children.form = new Form({
      inputs: regFields.map((regField) => ({
        ...regField,
        events: {
          // focusin: () => this.form.validate(input.name),
          // focusout: () => this.form.validate(input.name),
        },
      })),
    });
    this.children.passwords = new Form({
      inputs: passFields.map((password) => ({
        ...password,
        events: {
          // focusin: () => this.form.validate(input.name),
          // focusout: () => this.form.validate(input.name),
        },
      })),
    });
    this.children.save = new Button({
      label: "Save",
      events: {
        click: () => renderDom("authorizationPage"),
      },
      class: style.button,
    });
    this.children.cancel = new Button({
      label: "Cancel",
      events: {
        click: () => renderDom("authorizationPage"),
      },
      class: style.button,
    });
  }

  render() {
    return this.compile(template, { style });
  }
}
