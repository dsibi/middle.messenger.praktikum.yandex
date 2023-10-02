import { HTTPTransport } from "../utils/HTTPTransport";
import { BaseAPI } from "./BaseAPI";

export interface UserData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface PassData {
  oldPassword: string;
  newPassword: string;
}

class UserAPI extends BaseAPI {
  protected http: HTTPTransport;
  constructor() {
    super();
    this.http = new HTTPTransport("/user");
  }

  profile(data: UserData) {
    return this.http.put("/profile", { data });
  }

  password(data: PassData) {
    return this.http.put("/password", { data });
  }
}

export default new UserAPI();
