import Block from "../../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import Error, { ErrorProps } from "../../../components/error/index";
import path from "../../../static/img/problem.png";

export interface Error500PageProps {
  error: ErrorProps;
}

export default class Error500 extends Block<Error500PageProps> {
  constructor() {
    super({
      error: new Error({
        errorPath: path,
        desc: "Error 500 - server is unavailable",
      }),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
