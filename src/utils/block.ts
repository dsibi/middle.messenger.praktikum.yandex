import EventBus from "./EventBus";
import { nanoid } from "nanoid";

export default abstract class Block<
  Props extends Record<string, any> = unknown
> {
  static EVENTS = {
    // init — создание обёртки DOM-элемента и вызов CDM
    INIT: "init",
    //эмитится через метод dispatchComponentDidMount снаружи блока
    FLOW_CDM: "flow:component-did-mount",
    //эмитится через Event Bus после изменения пропсов блока
    FLOW_CDU: "flow:component-did-update",
    // делается рендер строки
    FLOW_RENDER: "flow:render",
  };

  public children: Record<string, Block | Block[]>;
  protected props: Props;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  public id = nanoid(6);

  constructor(propsWithChildren: any = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.children = children;
    // создаём Proxy-объекты,
    this.props = this._makePropsProxy(props);

    // создаём Event Bus
    this.eventBus = () => eventBus;

    // регистрируем события и, чтобы изолировать компоненты друг от друга,
    // сделаем Event Bus приватным для каждого из них
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every((el) => el instanceof Block)) {
        children[key] = value;
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) =>
      this._element?.addEventListener(eventName, events[eventName])
    );
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) =>
      this._element?.removeEventListener(eventName, events[eventName])
    );
  }

  _registerEvents(eventBus: EventBus) {
    //подписки
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init(): void {}

  _componentDidMount() {
    this.componentDidMount();
  }
  // Может переопределять пользователь, необязательно трогать
  componentDidMount(): void {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((el) => el.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element as HTMLElement;
  }

  private _render() {
    const block = this.render();
    const newElement = block.firstElementChild as HTMLElement;

    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._removeEvents();

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };
    // console.log(template(context));

    Object.entries(this.children).forEach(([name, component]) => {
      // console.log(component);
      if (Array.isArray(component)) {
        // console.log(contextAndStubs[name][1]);
        contextAndStubs[name] = component.map(
          (child) => `<div data-id="${child.id}"></div>`
        );
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
        // console.log(contextAndStubs);
      }
    });

    const html = template(contextAndStubs);
    const temp = document.createElement("template");

    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach((child) => {
          const stub = temp.content.querySelector(`[data-id="${child.id}"]`);
          if (!stub) return;
          stub.replaceWith(child.element!);
        });
      } else {
        const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
        if (!stub) return;
        stub.replaceWith(component.element!);
      }
    });
    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: any) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
