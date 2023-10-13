// export default class EventBus<E extends { [Ev: string]: unknown[] }> {
//   private readonly listeners: {
//     [K in keyof E]?: Array<(...args: E[K]) => void>;
//   } = {};

//   attach<K extends keyof E>(event: K, callback: (...args: E[K]) => void) {
//     if (!this.listeners[event]) {
//       this.listeners[event] = [];
//     }

//     this.listeners[event]!.push(callback);
//   }

//   detach<K extends keyof E>(event: K, callback: (...args: E[K]) => void) {
//     if (!this.listeners[event]) {
//       throw new Error(`Нет события: ${event as string}`);
//     }

//     this.listeners[event] = this.listeners[event]!.filter(
//       (listener) => listener !== callback
//     );
//   }

//   emit<K extends keyof E>(event: K, ...args: E[K] | any) {
//     if (!this.listeners[event]) {
//       return;
//     }

//     this.listeners[event]!.forEach((listener) => {
//       listener(...args);
//     });
//   }
// }

export type Listener<T extends unknown[] = any[]> = (...args: T) => void;

export default class EventBus<
  E extends string = string,
  M extends { [K in E]: unknown[] } = Record<E, any[]>
> {
  private listeners: { [key in E]?: Listener<M[E]>[] } = {};

  attach(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]?.push(callback);
  }

  dettach(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]?.filter(
      (listener) => listener !== callback
    );
  }

  emit(event: E, ...args: M[E]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event]?.forEach(function (listener) {
      listener(...args);
    });
  }
}
