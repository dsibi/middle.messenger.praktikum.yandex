// import { AuthorizationPage } from "../pages/errors/404";
// import { RegistrationPage } from "../pages/reg";
// import { ProfilePage } from "../pages/profile";
import { ChatsPage } from "../pages/chats/index";
import { ErrorPage as ErrorPage404 } from "../pages/errors/404";
import { ErrorPage as ErrorPage500 } from "../pages/errors/500";

export const ROUTES = {
  // authorizationPage: AuthorizationPage,
  //   registrationPage: RegistrationPage,
  //   profilePage: ProfilePage,
  chatsPage: ChatsPage,
  errorPage404: ErrorPage404,
  errorPage500: ErrorPage500,
};

export function renderDom(route: keyof typeof ROUTES) {
  const root = document.querySelector("#app")!;
  // console.log(root);
  root.innerHTML = "";
  const PageComponent = ROUTES[route];
  // console.log(PageComponent);
  const page = new PageComponent();
  // console.log(page);
  root.appendChild(page.element);
  page.dispatchComponentDidMount();
}
