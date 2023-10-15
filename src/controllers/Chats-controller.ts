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
      const dialog: HTMLDialogElement | null = document.querySelector("dialog");
      dialog!.close();
      this.getChats();
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async getChats(data?: IChatsGet) {
    let response: any;
    try {
      response = await this.api.getChats(data);
      if (apiHasError(response)) {
        throw Error(response.reason);
      }

      Store.set("chats", response);
      Store.set("activeChatId", response[0].id);
      Store.set("activeChatName", response[0].title);
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
    return response;
  }

  async addUsersToChat(data: AddUser) {
    try {
      const response = await this.api.addUsersToChat(data);
      if (apiHasError(response)) {
        throw Error(response.reason);
      }
      Store.set("chats", response);
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
  }

  async getChatToken(id: number) {
    let response;
    try {
      response = await this.api.getChatToken(id);
      if (apiHasError(response)) {
        throw Error(response.reason);
      }
      Store.set("current_chat_token", response);
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
    return response as Token;
  }

  selectChat(id: number) {
    Store.set("selectedChat", id);
  }
}

export default new ChatController();
