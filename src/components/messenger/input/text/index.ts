import Block from "../../../../utils/Block";
import template from "./tmpl.hbs";

export interface TextProps {
  placeholder: string;
  // events: {
  //   focus: () => void;
  //   blur: () => void;
  // };
}

export default class Text extends Block<TextProps> {
  textElement: HTMLInputElement;
  constructor(props: TextProps) {
    super(props);
    this.textElement = this.element as HTMLInputElement;
  }

  get value() {
    return this.textElement.value;
  }

  get name() {
    return this.textElement.name;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
