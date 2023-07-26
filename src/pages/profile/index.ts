/* eslint-disable @typescript-eslint/semi */
import Block from "../../utils/Block";
import { renderDom } from "../../utils/renderDom";
import template from "./template.hbs";
import style from "./style.module.css";
import { Form } from "../../components/Form";
import { FormInputProps } from "../../components/Form/FormInput";
import { Header } from "../../components/Header";
import { Avatar } from "../../components/Avatar";
import avaPath from "../../../static/img/avatar.png";
import { Button, ButtonProps } from "../../components/Button";

class ProfileField implements FormInputProps {
  for: string;
  label: string;
  name: string;
  type: string;
  id: string;
  value: string;
  constructor(id: string, label: string, value: string) {
    this.for = id;
    this.label = label;
    this.id = id;
    this.value = value;
    this.type = id;
    this.name = id;
  }
}

const pfFields: ProfileField[] = [
  new ProfileField("first_name", "First Name", "Dmitry"),
  new ProfileField("second_name", "Second Name", "Sib"),
  new ProfileField("display_name", "Display Name", "Dmitry Sib"),
  new ProfileField("login", "Login", "dimas"),
  new ProfileField("email", "Email", "dimas@dimas.world"),
  new ProfileField("phone", "Phone", "+7-777-777-7777"),
  new ProfileField("old_password", "Old Password", "********"),
  new ProfileField("new_password", "New Password", "********"),
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
      })),
    });
    this.children.save = new Button({
      label: "Save",
      class: style.button,
      events: {
        click: () => {
          let data = this.form.getValues();
          console.log(data);
        },
      },
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
    // console.log(this.children.form.inputsElements);
    return this.compile(template, { style });
  }
}
