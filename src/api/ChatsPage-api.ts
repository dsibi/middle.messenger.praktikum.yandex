import { HTTPTransport } from "../utils/HTTPTransport";
import { BaseAPI } from "./BaseAPI";

class ChatAPI extends BaseAPI {
  protected http: HTTPTransport;

  constructor() {
    super();
    this.http = new HTTPTransport("/chats");
  }

  createChat(data: CreateChat) {
    return this.http.post("/", { data });
  }

  getChats(data?: IChatsGet) {
    return this.http.get("/", { data });
  }

  addUsersToChat(data: AddUser) {
    return this.http.put("/users", { data });
  }

  getChatToken(chatId: number): Promise<Token | APIError> {
    return this.http.post(`/token/${chatId}`, {});
  }
}

export default new ChatAPI();
