import { HTTPTransport } from "../utils/HTTPTransport";
import { BaseAPI, UserData, PassData, APIError } from "./BaseAPI";

class UserAPI extends BaseAPI {
  protected http: HTTPTransport;
  constructor() {
    super();
    this.http = new HTTPTransport("/user");
  }

  profile(data: UserData): Promise<UserData | APIError> {
    return this.http.put("/profile", { data });
  }

  password(data: PassData): Promise<PassData | APIError> {
    return this.http.put("/password", { data });
  }

  avatar(avatar: FormData): Promise<void | APIError> {
    return this.http.put("/profile/avatar", { avatar });
  }
}

export default new UserAPI();
