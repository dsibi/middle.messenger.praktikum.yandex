import { HTTPTransport } from "../utils/HTTPTransport";
import { BaseAPI } from "./BaseAPI";

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

class AuthAPI extends BaseAPI {
  protected http: HTTPTransport;
  constructor() {
    super();
    this.http = new HTTPTransport("/auth");
  }

  signup(data: SignupData) {
    return this.http.post("/signup", { data });
  }

  signin(data: SignupData) {
    return this.http.post("/signin", { data });
  }

  logout() {
    return this.http.post("/logout");
  }
}

export default new AuthAPI();
