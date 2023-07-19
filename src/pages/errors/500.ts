import Block from "../../utils/Block";
import template from "./template.hbs";
import { Button } from "../../components/Button";
import { renderDom } from "../../utils/renderDom";
import style from "./style.module.css";

export class ErrorPage extends Block {
  init() {
    this.children.button = new Button({
      label: "Back to chats",
      events: {
        click: () => renderDom("chatsPage"),
      },
    });
  }

  render() {
    return this.compile(template, { style, type: "500" });
  }
}
