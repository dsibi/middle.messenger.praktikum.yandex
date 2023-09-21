import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";
import Logo, { LogoProps } from "../../components/logo/index";
import Form, { FormProps } from "../../components/form/index";
import Button, { ButtonProps } from "../../components/button/index";
import { inputsData } from "../../data/reg";

export interface RegPageProps {
  logo: LogoProps;
  form: FormProps;
  regBtn: ButtonProps;
}

export default class RegPage extends Block<RegPageProps> {
  constructor() {
    let form = new Form({
      input: inputsData.map((input) => ({
        ...input,
      })),
    });
    super({
      logo: new Logo(),
      form: form,
      regBtn: new Button({
        id: "regBtn",
        label: "Registration",
        events: {
          click: () => {
            const data = form.getValues();
            console.log(data);
            const isValid = form.isValid();
            console.log("form is valid: ", isValid);
          },
        },
      }),
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
