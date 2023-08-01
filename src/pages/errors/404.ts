import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";
import { Button } from "../../components/Button";
import router from "../../utils/Router";
import { PATHNAMES } from "../../utils/paths";
export class ErrorPage extends Block {
  init() {
    this.children.button = new Button({
      label: "Back to chats",
      events: {
        click: () => router.go(PATHNAMES.CHAT_PATH),
      },
    });
  }

  render() {
    return this.compile(template, { style, type: "404" });
  }
}
