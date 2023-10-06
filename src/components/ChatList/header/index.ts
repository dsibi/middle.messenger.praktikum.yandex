import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Avatar, AvaProps } from "../../avatar";
import myAvaPath from "../../../static/img/avatar.png";
import addChatAvaPath from "../../../static/img/plus.png";
import settingsAvaPath from "../../../static/img/dots_white.png";
import AuthController from "../../../controllers/Auth-controller";
import { Button, ButtonProps } from "../../button";
import { Input, InputProps } from "../../form/input";
import ChatsController from "../../../controllers/Chats-controller";

export interface HeaderProps {
  myAva: AvaProps;
  name: string;
  addChatAva: AvaProps;
  chatName: InputProps;
  createChatBtn: ButtonProps;
  closeBtn: ButtonProps;
  settingsAva: AvaProps;
}
export class Header extends Block<HeaderProps> {
  constructor() {
    let chatName = new Input({
      label: "Chat Name",
      name: "chat_name",
      type: "text",
    });
    super({
      myAva: new Avatar({
        avaPath: myAvaPath,
        altText: "My Ava",
      }),
      name: "Dmitry Sib",
      addChatAva: new Avatar({
        avaPath: addChatAvaPath,
        altText: "Add Chat",
        events: {
          click: () => {
            const dialog: HTMLDialogElement | null =
              document.querySelector("dialog");
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
            const dialog: HTMLDialogElement | null =
              document.querySelector("dialog");
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
  render() {
    return this.compile(template, { ...this.props });
  }
}
