import AuthAPI from "../api/Auth-api";
import { UserData } from "../api/BaseAPI";
import { apiHasError } from "../utils/apiHasError";
import Router from "../utils/router";
import { NotificationTypes, showNotification } from "../utils/showNotification";
import Store from "../utils/Store";

class AuthController {
  private readonly api;

  constructor() {
    this.api = AuthAPI;
  }

  async signup(data: UserData) {
    try {
      const response = await this.api.signup(data);
      if (apiHasError(response)) {
        throw Error(response.reason);
      }
      await this.user();
      Router.go("/chats");
    } catch (e: any) {
      showNotification(e.message, NotificationTypes.Warning);
    }
  }

  async signin(data: UserData) {
    try {
      const response = await this.api.signin(data);
      if (apiHasError(response)) {
        throw Error(response.reason);
      }
      Router.go("/chats");
    } catch (e: any) {
      showNotification(e.message, NotificationTypes.Warning);
    }
  }

  async logout() {
    try {
      const response = await this.api.logout();
      if (apiHasError(response)) {
        throw Error(response.reason);
      }
      Router.go("/");
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async user() {
    try {
      const response = await this.api.user();
      if (apiHasError(response)) {
        throw Error(response.reason);
      }
      Store.set("user", response);
      Router.go("/settings");
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async isUserLoggedIn() {
    try {
      const response = await this.api.user();
      if (apiHasError(response)) {
        throw Error(response.reason);
      }
      Router.go("/chats");
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }
}
export default new AuthController();
