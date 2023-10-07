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

  getChats() {
    return this.http.get("/", {});
  }
}

export default new ChatAPI();
