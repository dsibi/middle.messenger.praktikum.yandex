import UserAPI from "../api/User-api";
import Store from "../utils/Store";
import { apiHasError } from "../utils/apiHasError";
import Router from "../utils/router";
import { NotificationTypes, showNotification } from "../utils/showNotification";

class UserController {
  private readonly api;

  constructor() {
    this.api = UserAPI;
  }

  async profile(data: UserData) {
    try {
      const response = await this.api.profile(data);
      if (apiHasError(response)) {
        throw Error(response.reason);
      }
      Router.go("/messenger");
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async password(data: PassData) {
    try {
      const response = await this.api.password(data);
      if (apiHasError(response)) {
        throw Error(response.reason);
      }
      Router.go("/messenger");
    } catch (e: any) {
      showNotification(e, NotificationTypes.Warning);
    }
  }

  async avatar(data: FormData) {
    try {
      const response = await this.api.avatar(data);
      if (apiHasError(response)) {
        throw Error(response.reason);
      }
      Store.set("avatar", response);
      showNotification("Аватар успешно обновлен");
    } catch (e: any) {
      showNotification(e, NotificationTypes.Warning);
    }
  }
}

export default new UserController();
