import { AuthorizationPage } from "../pages/auth";
// import { RegistrationPage } from "../pages/reg";
// import { ProfilePage } from "../pages/profile";
// import { ChatsPage } from "../pages/chats";
// import { ErrorPage as ErrorPage404 } from "../pages/errors/404";
// import { ErrorPage as ErrorPage500 } from "../pages/errors/500";

export const ROUTES = {
  authorizationPage: AuthorizationPage,
  //   registrationPage: RegistrationPage,
  //   profilePage: ProfilePage,
  //   chatsPage: ChatsPage,
  //   errorPage404: ErrorPage404,
  //   errorPage500: ErrorPage500,
};

export function renderDom(route: keyof typeof ROUTES) {
  const root = document.querySelector("#app")!;

  root.innerHTML = "";

  const PageComponent = ROUTES[route];
  const page = new PageComponent();

  root.appendChild(page.element);

  page.dispatchComponentDidMount();
}
