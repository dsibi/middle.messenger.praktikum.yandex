import Block from "../../utils/Block";
import { renderDom } from "../../utils/renderDom";
import template from "./template.hbs";
import style from "./style.module.css";
import { Button } from "../../components/Button";

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
    return this.compile(template, { style, type: "404" });
  }
}
