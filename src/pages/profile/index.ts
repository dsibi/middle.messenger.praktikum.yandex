import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Avatar, AvaProps } from "../../components/avatar";
import path from "../../static/img/avatar.png";
import { Form, FormProps } from "../../components/form/index";
import { Button, ButtonProps } from "../../components/button/index";
import { inputsData } from "../../data/profile";
import Router from "../../utils/router";
import { connect } from "../../utils/connect";
import UserController from "../../controllers/User-controller";
import { UserData } from "../../api/User-api";

export interface PfPageProps {
  myAva: AvaProps;
  form: FormProps;
  confirmBtn: ButtonProps;
  cancelBtn: ButtonProps;
}

class PfPage extends Block<PfPageProps> {
  constructor(props: any) {
    const serverData = JSON.parse(props.user);
    Object.values(inputsData).forEach((input) => {
      let name = input.name;
      input.value = serverData[name];
    });
    let form = new Form({
      input: inputsData.map((input) => ({
        ...input,
      })),
    });
    super({
      myAva: new Avatar({
        avaPath: path,
        altText: "My Ava",
      }),
      form: form,
      confirmBtn: new Button({
        id: "confirm",
        label: "Confirm",
        events: {
          click: () => {
            const data = form.getValues();
            console.log("data:", data);
            const isValid = form.isValid();
            if (isValid) {
              UserController.profile(data as UserData);
            }
          },
        },
      }),
      cancelBtn: new Button({
        id: "cancel",
        label: "Cancel",
        events: {
          click: () => Router.go("/chats"),
        },
      }),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const ProfileWithStore = connect((state) => ({ user: state.user }))(PfPage);
export default ProfileWithStore;
