import EventBus from "./EventBus";

type Indexed<T = any> = {
  [key in string]: T;
};

//функция - склеивает два объекта
export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

//функция - устанавливает полученное значение по указанному пути
export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof path !== "string") {
    throw Error("path must be string");
  }

  if (typeof object !== "object") {
    return value;
  }

  const splittedPath = path.split(".");
  const result = splittedPath.reduceRight<Indexed>(
    (previousValue, currentValue) => ({
      [currentValue]: previousValue,
    }),
    value as any
  );

  return merge(object as Indexed, result as Indexed);
}

export enum StoreEvents {
  Updated = "updated",
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store<State extends Record<string, any>> extends EventBus {
  private state: State = {} as State;

  public getState() {
    return this.state;
  }
  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
