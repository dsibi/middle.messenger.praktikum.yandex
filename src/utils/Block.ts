import EventBus from "./EventBus";
import { v4 as makeUUID } from "uuid";

type Nullable<T> = T | null;
type Props<P extends Record<string, unknown> = any> = {
  events?: Record<string, (e?: Event) => void>;
} & P;

// Нельзя создавать экземпляр данного класса
export default class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  protected props: Props<P>;
  protected children: Record<string, Block | Block[]>;
  private id: Nullable<string> = null;
  private _element: Nullable<HTMLElement> = null;
  private eventBus: EventBus;

  // Создаём в конструкторе необходимые ресурсы для компонента:
  constructor(propsAndChildren: Props<P> = {} as Props<P>) {
    // элемент-обёртку,
    const { children, props } = this.getChildrenAndProps(propsAndChildren);
    this.children = children;
    // создаём Event Bus => this.eventBus = () => eventBus;
    this.eventBus = new EventBus();
    this.id = makeUUID();
    // создаём Proxy-объекты => this.props = this._makePropsProxy(props);
    this.props = this.makePropsProxy({ ...props, __id: this.id });

    this.initChildren();
    // регистрируем события => this._registerEvents(eventBus);
    this.registerEvents();
    this.eventBus.emit(Block.EVENTS.INIT); //eventBus.emit(Block.EVENTS.INIT);
  }

  registerEvents() {
    this.eventBus.attach(Block.EVENTS.INIT, this._init.bind(this));
    this.eventBus.attach(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this)
    );
    this.eventBus.attach(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this)
    );
    this.eventBus.attach(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    if (this.id) {
      this._setAttributes(element);
    }
    return element;
  }

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;
    this.removeEvents();
    if (this._element) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this.addEvents();
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  getChildrenAndProps(propsAndChildren: Props<P>): {
    props: Props<P>;
    children: Record<string, Block> | Record<string, Block[]>;
  } {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block> | Record<string, Block[]> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (
        Array.isArray(value) &&
        value.every((v) => v instanceof Block)
      ) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as Props<P>, children };
  }

  compile(template: (props: any) => string, props: any) {
    if (typeof props == "undefined") props = this.props;

    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        const result: string[] = [];
        child.map((el) => {
          if (el instanceof Block) {
            result.push(`<div data-id="${el.id}"></div>`);
          }
        });
        propsAndStubs[key] = result;
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });

    const fragment = this.createDocumentElement(
      "template"
    ) as HTMLTemplateElement;
    const html = template(propsAndStubs);
    fragment.innerHTML = html;

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.map((el) => {
          if (el instanceof Block) {
            const stub = fragment.content.querySelector(`[data-id="${el.id}"]`);
            if (stub) {
              stub.replaceWith(el.getContent()!);
            }
          }
        });
      }

      const stub = fragment.content.querySelector(
        `[data-id="${(child as Block<any>).id}"]`
      );
      // console.log(child);
      if (stub) {
        // console.log(stub);

        stub.replaceWith((child as Block<any>).getContent()!);
      }
    });

    return fragment.content;
  }

  _componentDidMount() {
    // debugger;
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.map((el) => {
          if (el instanceof Block) {
            el.dispatchComponentDidMount();
          }
        });
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    if (Object.keys(this.children).length)
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidUpdate(oldProps: Props<P>, newProps: Props<P>) {
    const isReRender = this.componentDidUpdate(oldProps, newProps);
    if (isReRender) this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps: Props<P>, newProps: Props<P>) {
    return oldProps !== newProps;
  }

  setProps(newProps: any) {
    if (!newProps) {
      return;
    }
    Object.assign(this.props, newProps);
  }

  makePropsProxy(props: Props<P>) {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as string];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        if (/*target[prop as string] !== value*/ true) {
          const oldProps = { ...target };
          target[prop as keyof Props<P>] = value;
          self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        }
        return true;
      },
      deleteProperty(target, prop) {
        const oldProps = { ...target };
        delete target[prop as string];
        if (self.element) {
          self._removeAttributes(self.element, prop as string);
        }
        self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
    });
  }

  _setAttributes(elem: HTMLElement) {
    enum Attr {
      name = "name",
      value = "value",
      class = "class",
      id = "id",
      src = "src",
      href = "href",
      alt = "alt",
      title = "title",
      disabled = "disabled",
      checked = "checked",
      placeholder = "placeholder",
      type = "type",
      required = "required",
    }
    if (this.id) {
      elem.setAttribute("data-id", this.id);
      Object.entries(this.props).forEach(([key, value]: [string, any]) => {
        if (key in Attr) {
          elem.setAttribute(key, value);
        }
      });
    }
  }

  setAttibutes(elem: HTMLElement) {
    if (elem) {
      this._setAttributes(elem);
    }
  }

  _removeAttributes(elem: HTMLElement, attribute: string) {
    elem.removeAttribute(attribute);
  }

  show() {
    this.getContent()!.style.display = "flex";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }

  getContent() {
    return this._element;
  }

  protected initChildren(): void {}
}
