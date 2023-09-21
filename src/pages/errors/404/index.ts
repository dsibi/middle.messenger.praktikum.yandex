import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import { Error, ErrorProps } from "../../../components/error/index";
import path from "../../../static/img/error-404.png";

export interface Error404PageProps {
  error: ErrorProps;
}

export default class Error404 extends Block<Error404PageProps> {
  constructor() {
    super({
      error: new Error({
        errorPath: path,
        desc: "Error 404 - page does not exist",
      }),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
