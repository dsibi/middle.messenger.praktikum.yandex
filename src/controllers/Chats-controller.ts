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

  async getChats(data?: IChatsGet) {
    let response;
    try {
      response = await this.api.getChats(data);
      if (apiHasError(response)) {
        throw Error(response.reason);
      }
      Store.set("chats", response);
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
      console.log(response);
      // Store.set("chats", response);
    } catch (e: any) {
      showNotification(e.reason, NotificationTypes.Warning);
    }
    return response as Token;
  }

  // async chatChange(data: number) {
  //   try {
  //     const token: Token = await ChatsController.getChatToken(latestChatId);
  //     MessageController.connect({
  //       userId,
  //       chatId: latestChatId,
  //       token: token.token,
  //     });
  //     MessageController.getMessages({ offset: 0 });
  //   } catch (e: any) {
  //     showNotification(e, NotificationTypes.Warning);
  //   }
  // }
}

export default new ChatController();
