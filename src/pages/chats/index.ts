import Block from "../../utils/Block";
import template from "./template.hbs";
import { Button } from "../../components/Button";
import { renderDom } from "../../utils/renderDom";
import style from "./style.module.css";

export class ChatsPage extends Block {
  init() {
    this.children.button = new Button({
      label: "назад к чатам",
      events: {
        click: () => renderDom("errorPage404"),
      },
    });
  }

  render() {
    return this.compile(template, { style, type: "404" });
  }
}