import RegAPI, { SignupData } from "../api/Auth-api";
import Router from "../utils/router";
import { NotificationTypes, showNotification } from "../utils/showNotification";

export class RegController {
  private readonly api;

  constructor() {
    this.api = RegAPI;
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      //   await this.fetchUser();
      Router.go("/chats");
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async signin(data: SignupData) {
    try {
      await this.api.signin(data);
      //   await this.fetchUser();
      Router.go("/chats");
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async logout() {
    try {
      await this.api.logout();
      //   await this.fetchUser();
      Router.go("/");
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }
}
export default new RegController();
