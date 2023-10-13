import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Error, ErrorProps } from "../../../components/error/index";
import path from "../../../static/img/error-404.png";
import Router from "../../../utils/router";

export interface Error404PageProps {
  error: ErrorProps;
}

export default class Error404 extends Block {
  constructor() {
    super({
      error: new Error({
        errorPath: path,
        desc: "Error 404 - page does not exist",
        events: {
          click: () => Router.go("/"),
        },
      }),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
