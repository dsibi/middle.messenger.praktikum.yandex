import UserAPI, { UserData } from "../api/User-api";
import Router from "../utils/router";
import { NotificationTypes, showNotification } from "../utils/showNotification";
import Store from "../utils/Store";

class UserController {
  private readonly api;

  constructor() {
    this.api = UserAPI;
  }

  async profile(data: UserData) {
    try {
      const updatedData = await this.api.profile(data);
      Store.set("user", updatedData);
      showNotification("Данные профиля успешно обновлены");
      Router.go("/chats");
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }
}

export default new UserController();
