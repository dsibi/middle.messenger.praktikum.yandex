import ChatAPI from "../api/ChatsPage-api";
import Store from "../utils/Store";
import { apiHasError } from "../utils/apiHasError";
import { NotificationTypes, showNotification } from "../utils/showNotification";

class ChatController {
  private readonly api;

  constructor() {
    this.api = ChatAPI;
  }

  async chats(data: CreateChat) {
    try {
      const response = await this.api.createChat(data);
      if (apiHasError(response)) {
        throw Error(response.reason);
      }
      Store.set("chat_id", response);
      const dialog: HTMLDialogElement | null = document.querySelector("dialog");
      dialog!.close();
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async getChats() {
    try {
      const response = await this.api.getChats();
      if (apiHasError(response)) {
        throw Error(response.reason);
      }
      console.log(response);
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }
}

export default new ChatController();
