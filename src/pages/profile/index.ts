import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { AvatarCopy, AvaCopyProps } from "../../components/avatarPf";
import { Form, FormProps } from "../../components/form/index";
import { Button, ButtonProps } from "../../components/button/index";
import { inputsData, passData } from "../../data/profile";
import Router from "../../utils/router";
import { connect } from "../../utils/connect";
import UserController from "../../controllers/User-controller";
import { PassData, UserData } from "../../api/BaseAPI";

export interface PfPageProps {
  myAva: AvaCopyProps;
  userDataForm: FormProps;
  confirmBtn: ButtonProps;
  cancelBtn: ButtonProps;
  passForm: FormProps;
  confirmPassBtn: ButtonProps;
}

class PfPage extends Block<PfPageProps> {
  constructor(props: any) {
    const serverData = props.user;
    console.log(serverData);

    Object.values(inputsData).forEach((input) => {
      let name = input.name;
      input.value = serverData[name];
    });
    let userDataForm = new Form({
      input: inputsData.map((input) => ({
        ...input,
      })),
    });
    let passForm = new Form({
      input: passData.map((input) => ({
        ...input,
      })),
    });
    super({
      myAva: new AvatarCopy({
        avaPath:
          "https://ya-praktikum.tech/api/v2/resources" + serverData.avatar,
        altText: "My Ava",
        events: {
          submit: (event) => {
            event.preventDefault();
            const avatar = document.getElementById(
              "avatar"
            ) as HTMLInputElement;
            const avaForm = new FormData();
            avaForm.append("avatar", avatar!.files![0]);
            UserController.avatar(avaForm);
            Router.go("/chats");
          },
        },
      }),
      userDataForm: userDataForm,
      confirmBtn: new Button({
        id: "confirm",
        label: "Confirm",
        events: {
          click: () => {
            const data = userDataForm.getValues();
            console.log("data:", data);
            const isValid = userDataForm.isValid();
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
      passForm: passForm,
      confirmPassBtn: new Button({
        id: "confirm",
        label: "Change password",
        events: {
          click: () => {
            const data = passForm.getValues();
            console.log("data:", data);
            const isValid = passForm.isValid();
            if (isValid) {
              UserController.password(data as PassData);
            }
          },
        },
      }),
      cancelPassBtn: new Button({
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
