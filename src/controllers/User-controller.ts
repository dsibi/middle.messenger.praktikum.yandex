import UserAPI, { PassData, UserData } from "../api/User-api";
import Router from "../utils/router";
import { NotificationTypes, showNotification } from "../utils/showNotification";

class UserController {
  private readonly api;

  constructor() {
    this.api = UserAPI;
  }

  async profile(data: UserData) {
    try {
      await this.api.profile(data);
      showNotification("Данные профиля успешно обновлены");
      Router.go("/chats");
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async password(data: PassData) {
    try {
      await this.api.password(data);
      showNotification("Пароль успешно обновлен");
      Router.go("/chats");
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }
}

export default new UserController();
