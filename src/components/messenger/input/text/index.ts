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
  constructor(props: TextProps) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
