import AuthAPI, { SignupData } from "../api/Auth-api";
import Router from "../utils/router";
import { NotificationTypes, showNotification } from "../utils/showNotification";

export class AuthController {
  private readonly api;

  constructor() {
    this.api = AuthAPI;
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      Router.go("/chats");
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async signin(data: SignupData) {
    try {
      const response = await this.api.signin(data);
      console.log(
        (response as XMLHttpRequest).status == 200
          ? (response as XMLHttpRequest).response
          : JSON.parse((response as XMLHttpRequest).response).reason
      );
      if ((response as XMLHttpRequest).status == 200) {
        Router.go("/chats");
      }
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async logout() {
    try {
      await this.api.logout();
      Router.go("/");
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }
}
export default new AuthController();
