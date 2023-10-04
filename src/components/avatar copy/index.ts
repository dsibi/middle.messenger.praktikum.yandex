import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export interface AvaCopyProps {
  avaPath: string;
  altText: string;
  events?: {
    submit: (e: Event) => void;
  };
}

export class AvatarCopy extends Block<AvaCopyProps> {
  constructor(props: AvaCopyProps) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
