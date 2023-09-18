import AuthPage from "../pages/auth";
import Error404 from "../pages/errors/404";
import Error500 from "../pages/errors/500";
import PfPage from "../pages/profile";
import ChatsPage from "../pages/chats";
import RegPage from "../pages/reg";

export const routes = {
  authorizationPage: AuthPage,
  registrationPage: RegPage,
  profilePage: PfPage,
  chatsPage: ChatsPage,
  errorPage404: Error404,
  errorPage500: Error500,
};

export function renderDom(route: keyof typeof routes) {
  const root = document.querySelector("#app")!;
  root.innerHTML = "";
  const PageComponent = routes[route];
  const page = new PageComponent();
  root.appendChild(page.element!);
  page.dispatchComponentDidMount();
}
