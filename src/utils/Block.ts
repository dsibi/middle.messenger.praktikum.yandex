import EventBus from "./EventBus";
import Handlebars from "handlebars";
import { v4 as makeUUID } from "uuid";

// Нельзя создавать экземпляр данного класса
export default abstract class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _props: Record<string | symbol, any>;
  _children: Record<string, Block> | Record<string, Block[]> = {};
  _id: null | string = null;
  _element: HTMLElement | null = null;
  _meta: {
    tagName: string;
    propsAndChildren?: unknown;
  } | null = null;
  _eventBus: EventBus;
  _setUpdate: boolean = false;

  // Создаём в конструкторе необходимые ресурсы для компонента:
  constructor(
    tagName: string = "div",
    propsAndChildren: Record<string | symbol, any> = {}
  ) {
    // элемент-обёртку,
    const { children, props } = this.getChildrenAndProps(propsAndChildren);
    // создаём Event Bus => this.eventBus = () => eventBus;
    this._eventBus = new EventBus();
    this._id = makeUUID();
    this._children = this.makePropsProxy({ ...children });
    // создаём Proxy-объекты => this.props = this._makePropsProxy(props);
    this._props = this.makePropsProxy({ ...props, __id: this._id });
    // сохраняем метаинформацию от пользователя,
    this._meta = { tagName, propsAndChildren };
    // регистрируем события => this._registerEvents(eventBus);
    this.registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT); //eventBus.emit(Block.EVENTS.INIT);
  }

  registerEvents() {
    this._eventBus.attach(Block.EVENTS.INIT, this._init.bind(this));
    this._eventBus.attach(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this)
    );
    this._eventBus.attach(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this)
    );
    this._eventBus.attach(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta!;
    this._element = this.createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();
    this.init();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    if (this._id) {
      this._setAttributes(element);
    }
    return element;
  }

  _render() {
    const block = this.render(); // render теперь возвращает DocumentFragment
    this.removeEvents();
    if (this._element && block !== undefined) {
      this._element.innerHTML = ""; // удаляем предыдущее содержимое
      this._element.appendChild(block);
      this._setAttributes(this._element);
    }
    this.addEvents();
  }

  render() {}

  addEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  removeEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  getChildrenAndProps(propsAndChildren: Record<string | symbol, any>) {
    const children: Record<string, Block> | Record<string, Block[]> = {};
    const props: Record<string | symbol, any> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const result: Block[] = [];
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

  compile(template: string, props: any) {
    if (typeof props == "undefined") props = this._props;

    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        const result: string[] = [];
        child.map((el) => {
          if (el instanceof Block) {
            result.push(`<div data-id="${el._id}"></div>`);
          }
        });
        propsAndStubs[key] = result;
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this.createDocumentElement(
      "template"
    ) as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach((child) => {
      if (Array.isArray(child)) {
        child.map((el) => {
          if (el instanceof Block) {
            const stub = fragment.content.querySelector(
              `[data-id="${el._id}"]`
            );
            if (stub) {
              stub.replaceWith(el.getContent()!);
            }
          }
        });
      }

      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent()!);
      }
    });

    return fragment.content;
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this._children).forEach((child) => {
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
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
    if (Object.keys(this._children).length)
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    const isReRender = this.componentDidUpdate(oldProps, newProps);
    if (isReRender) this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    return oldProps !== newProps;
  }

  setProps(newProps: unknown) {
    if (!newProps) {
      return;
    }

    this._setUpdate = true;
    const oldValue = { ...this._props };

    const { children, props } = this.getChildrenAndProps(newProps);

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }

    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, this._props);
      this._setUpdate = false;
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
          self._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        }
        return true;
      },
      deleteProperty(target, prop) {
        const oldProps = { ...target };
        delete target[prop];
        if (self._element) {
          self._removeAttributes(self._element, prop as string);
        }
        self._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
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
    if (this._id) {
      elem.setAttribute("data-id", this._id);
      Object.entries(this._props).forEach(([key, value]: [string, any]) => {
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
