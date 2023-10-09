declare global {
  declare module "*.hbs";
  declare module "*.png";
  declare module "*.scss";

  export interface UserData {
    id: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
    reason?: string;
  }

  export interface ChatsProps {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: {
      time: string;
      content: string;
    };
  }

  export interface CreateChat {
    title: string;
  }

  export interface Token {
    token: string;
    reason?: string;
  }

  export interface AddUser {
    users: number[];
    chatId: number;
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

  export interface IChatsGet {
    offset?: number;
    limit?: number;
    title?: string;
  }
}

export {};
