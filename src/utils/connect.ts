import Block from "./Block";
import store, { StoreEvents } from "../utils/Store";

type Indexed<T = any> = {
  [key in string]: T;
};

function isEqual(lhs: any, rhs: any) {
  return lhs === rhs;
}

export function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: any) {
        let state = mapStateToProps(store.getState());
        super({ ...props, ...state });
        // подписываемся на событие
        store.attach(StoreEvents.Updated, () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());
          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }
          // не забываем сохранить новое состояние
          state = newState;
        });
      }
    };
  };
}
