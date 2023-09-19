import Block from "../../utils/Block";
import template from "./tmpl.hbs";
import "./style.scss";

export interface AvaProps {
  avaPath: string;
  altText: string;
  events?: {
    click: () => void;
  };
}

export default class Avatar extends Block<AvaProps> {
  constructor(props: AvaProps) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
