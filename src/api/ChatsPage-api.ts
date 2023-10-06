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

  // getChats(params: Record<string, any>) {
  //   return this.http.get("/", params);
  // }
}

export default new ChatAPI();
