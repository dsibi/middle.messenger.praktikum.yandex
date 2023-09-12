type VoidSubscriber = (oldProps?: unknown, newProps?: unknown) => void;

export default class EventBus {
  listeners: Record<string, VoidSubscriber[]>;
  constructor() {
    this.listeners = {};
  }

  attach(event: string, callback: VoidSubscriber) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }

  detach(event: string, callback: VoidSubscriber) {
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }
}
