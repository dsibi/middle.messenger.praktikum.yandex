import UserAPI from "../api/User-api";
import { PassData, UserData } from "../api/BaseAPI";
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
      Router.go("/chats");
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
      Router.go("/chats");
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async avatar(avatar: FormData) {
    try {
      const response = await this.api.avatar(avatar);
      if (apiHasError(response)) {
        throw Error(response.reason);
      }
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }
}

export default new UserController();
