import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import Logo, { LogoProps } from "../../components/logo/index";
import Form, { FormProps } from "../../components/form/index";
import Button, { ButtonProps } from "../../components/button/index";
import { inputsData } from "../../data/reg";
import { renderDom } from "../../utils/renderDom";

export interface RegPageProps {
  logo: LogoProps;
  form: FormProps;
  regBtn: ButtonProps;
}

export default class RegPage extends Block<RegPageProps> {
  constructor() {
    super({
      logo: new Logo(),
      form: new Form({
        input: inputsData.map((input) => ({
          ...input,
          events: {
            // focusin: () => this.form.validate(input.name),
            // focusout: () => this.form.validate(input.name),
          },
        })),
      }),
      regBtn: new Button({
        id: "regBtn",
        label: "Registration",
        events: {
          click: () => renderDom("chatsPage"),
        },
      }),
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
