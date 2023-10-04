export interface UserData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface APIError {
  reason: string;
}

export interface PassData {
  oldPassword: string;
  newPassword: string;
}

export interface Response {
  response: string;
}

// export interface UserData {
//   id: number;
//   first_name: string;
//   second_name: string;
//   display_name: string;
//   login: string;
//   avatar: string;
//   email: string;
//   phone: string;
// }

// export function apiHasError(response: any): response is APIError {
//   return response.reason;
// }

export class BaseAPI {
  // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
  create() {
    throw new Error("Not implemented");
  }

  request() {
    throw new Error("Not implemented");
  }

  update() {
    throw new Error("Not implemented");
  }

  delete() {
    throw new Error("Not implemented");
  }
}
