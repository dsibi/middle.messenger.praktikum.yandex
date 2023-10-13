import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Avatar } from "../../avatar";
import settingsAvaPath from "../../../static/img/dots_white.png";
import AuthController from "../../../controllers/Auth-controller";
import addUserAvaPath from "../../../static/img/plus.png";
import { Input } from "../../form/input";
import { Button } from "../../button";
import ChatsController from "../../../controllers/Chats-controller";
import Store from "../../../utils/Store";

export interface HeaderProps {
  chats: ChatsProps[];
}

export class Header extends Block {
  constructor(props: HeaderProps) {
    let userID = new Input({
      label: "User ID",
      name: "userID",
      type: "text",
    });
    super({
      name: Store.getState().activeChatName,
      addUserAva: new Avatar({
        avaPath: addUserAvaPath,
        altText: "Add User",
        events: {
          click: () => {
            const dialog = document.getElementById(
              "userDialog"
            ) as HTMLDialogElement;
            dialog!.showModal();
          },
        },
      }),
      userID: userID,
      addUserBtn: new Button({
        id: "addUserBtn",
        label: "Add User",
        events: {
          click: () => {
            const data: AddUser = {
              users: [Number(userID.value)],
              chatId: props.chats[0].id,
            };
            console.log("data:", data);
            ChatsController.addUsersToChat(data);
          },
        },
      }),
      closeBtn: new Button({
        id: "closeBtn",
        label: "Close",
        events: {
          click: () => {
            const dialog = document.getElementById(
              "userDialog"
            ) as HTMLDialogElement;
            dialog!.close();
          },
        },
      }),
      settingsAva: new Avatar({
        avaPath: settingsAvaPath,
        altText: "Settings",
        events: {
          click: () => AuthController.logout(),
        },
      }),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
