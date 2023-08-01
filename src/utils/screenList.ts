import { BlockClass } from "./Block";
import { AuthorizationPage } from "../pages/auth";
import { RegistrationPage } from "../pages/reg";
import { ProfilePage } from "../pages/profile";
import { ChatsPage } from "../pages/chats/index";
import { ErrorPage as ErrorPage404 } from "../pages/errors/404";
// import { ErrorPage as ErrorPage500 } from "../pages/errors/500";

export enum Screens {
  Signin = "signin",
  Signup = "signup",
  Chat = "chat",
  Profile = "profile",
  PathNotFound = "path-not-found",
}

const map: Record<Screens, BlockClass<unknown>> = {
  [Screens.Signin]: AuthorizationPage,
  [Screens.Signup]: RegistrationPage,
  [Screens.Chat]: ChatsPage,
  [Screens.Profile]: ProfilePage,
  [Screens.PathNotFound]: ErrorPage404,
};

export const getScreenComponent = (screen: Screens): BlockClass<unknown> => {
  return map[screen];
};
