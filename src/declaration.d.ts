declare global {
  declare module "*.hbs";
  declare module "*.png";
  declare module "*.scss";
  export interface UserData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    reason?: string;
  }

  export interface CreateChat {
    title: string;
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
}

export {};
