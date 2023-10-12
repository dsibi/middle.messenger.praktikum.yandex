import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Avatar } from "../../avatar";
import addChatAvaPath from "../../../static/img/plus.png";
import settingsAvaPath from "../../../static/img/dots_white.png";
import AuthController from "../../../controllers/Auth-controller";
import { Button } from "../../button";
import { Input } from "../../form/input";
import ChatsController from "../../../controllers/Chats-controller";

export interface HeaderProps {
  user: UserData;
}
export class Header extends Block<HeaderProps> {
  constructor(props: HeaderProps) {
    let chatName = new Input({
      label: "Chat Name",
      name: "chat_name",
      type: "text",
    });
    super({
      myAva: new Avatar({
        avaPath:
          "https://ya-praktikum.tech/api/v2/resources" + props.user.avatar,
        altText: "My Ava",
      }),
      name: props.user.first_name,
      addChatAva: new Avatar({
        avaPath: addChatAvaPath,
        altText: "Add Chat",
        events: {
          click: () => {
            const dialog = document.getElementById(
              "chatDialog"
            ) as HTMLDialogElement;
            dialog!.showModal();
          },
        },
      }),
      chatName: chatName,
      createChatBtn: new Button({
        id: "createChatBtn",
        label: "Create New Chat",
        events: {
          click: () => {
            const data: CreateChat = { title: chatName.value };
            console.log("data:", data);
            ChatsController.chats(data);
          },
        },
      }),
      closeBtn: new Button({
        id: "closeBtn",
        label: "Close",
        events: {
          click: () => {
            const dialog = document.getElementById(
              "chatDialog"
            ) as HTMLDialogElement;
            dialog!.close();
          },
        },
      }),
      settingsAva: new Avatar({
        avaPath: settingsAvaPath,
        altText: "Settings",
        events: {
          click: () => AuthController.userData(),
        },
      }),
    });
  }

  // componentDidUpdate(oldProps: any, newProps: any) {
  //   if (oldProps.chats !== newProps.chats) {
  //     this.children.header.setProps({
  //       user: newProps.user.avaPath,
  //     });
  //   }
  //   return true;
  // }

  render() {
    return this.compile(template, { ...this.props });
  }
}
