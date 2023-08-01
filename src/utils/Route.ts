import Block, { BlockClass } from "./Block";

export class Route<Props = any> {
  private pathname: string;
  private blockClass: BlockClass<any>;
  private block: Block | null = null;
  private props: Props;

  constructor(pathname: string, view: BlockClass<Props>, props: Props) {
    this.pathname = pathname;
    this.blockClass = view;
    this.props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave() {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass({ ...this.props });
      const root = document.querySelector("#app");
      if (root) {
        root.innerHTML = "";
        root.appendChild(this.block.getContent());
      }
      return;
    }
    this.block.show();
  }
}
