import EventBus from "./EventBus";
import { v4 as makeUUID } from "uuid";

type Nullable<T> = T | null;

// Нельзя создавать экземпляр данного класса
export default abstract class Block<
  Props extends Record<string | symbol, any>
> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  protected props;
  protected children;
  private id: Nullable<string> = null;
  private _element: Nullable<HTMLElement> = null;
  private eventBus;
  private setUpdate: boolean = false;

  // Создаём в конструкторе необходимые ресурсы для компонента:
  constructor(propsAndChildren: Record<string | symbol, any> = {}) {
    // элемент-обёртку,
    const { children, props } = this.getChildrenAndProps(propsAndChildren);
    // создаём Event Bus => this.eventBus = () => eventBus;
    this.eventBus = new EventBus();
    this.id = makeUUID();
    this.children = this.makePropsProxy({ ...children });
    // создаём Proxy-объекты => this.props = this._makePropsProxy(props);
    this.props = this.makePropsProxy({ ...props, __id: this.id });
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

  getChildrenAndProps(propsAndChildren: Record<string | symbol, any>) {
    const children:
      | Record<string, Block<Props>>
      | Record<string, Block<Props>[]> = {};
    const props: Record<string | symbol, any> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const result: Block<Props>[] = [];
        value.map((el) => {
          if (el instanceof Block) {
            result.push(el);
          }
        });
        children[key] = result;
      }
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
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

      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      // console.log(child);
      if (stub) {
        // console.log(stub);

        stub.replaceWith(child.getContent()!);
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

  _componentDidUpdate(oldProps: any, newProps: any) {
    const isReRender = this.componentDidUpdate(oldProps, newProps);
    if (isReRender) this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    return oldProps !== newProps;
  }

  setProps(newProps: unknown) {
    if (!newProps) {
      return;
    }

    this.setUpdate = true;
    const oldValue = { ...this.props };

    const { children, props } = this.getChildrenAndProps(newProps);

    if (Object.values(children).length) {
      Object.assign(this.children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }

    if (this.setUpdate) {
      this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, this.props);
      this.setUpdate = false;
    }
  }

  makePropsProxy(props: Record<string | symbol, any>) {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        if (target[prop] !== value) {
          const oldProps = { ...target };
          target[prop] = value;
          self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        }
        return true;
      },
      deleteProperty(target, prop) {
        const oldProps = { ...target };
        delete target[prop];
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
}
