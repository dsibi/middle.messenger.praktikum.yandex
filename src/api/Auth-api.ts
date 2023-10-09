import { HTTPTransport } from "../utils/HTTPTransport";
import { BaseAPI } from "./BaseAPI";

class AuthAPI extends BaseAPI {
  protected http: HTTPTransport;
  constructor() {
    super();
    this.http = new HTTPTransport("/auth");
  }

  signup(data: UserData) {
    return this.http.post("/signup", { data });
  }

  signin(data: UserData): Promise<UserData | APIError> {
    return this.http.post("/signin", { data });
  }

  logout(): Promise<UserData | APIError> {
    return this.http.post("/logout");
  }

  user(): Promise<UserData | APIError> {
    return this.http.get("/user");
  }
}

export default new AuthAPI();
