// import { renderDom } from "./utils/renderDom";

// window.addEventListener("DOMContentLoaded", () => {
//   renderDom("authorizationPage");
//   // renderDom("profilePage");
//   // renderDom("registrationPage");
//   // renderDom("chatsPage");
// });

import router from "./utils/Router";
import { getScreenComponent, Screens } from "./utils/screenList";
// import { Screens } from 'types';
// import { components } from 'components';

const PATHNAMES = {
  SIGNIN_PATH: "/",
  SIGNUP_PATH: "/sign-up",
  CHAT_PATH: "/chat",
  PROFILE_PATH: "/profile",
  PATH_NOT_FOUND: "/path-not-found",
};

// components.forEach((component) => {
//   registerComponent(component);
// });

document.addEventListener("DOMContentLoaded", () => {
  router
    .use(PATHNAMES.SIGNIN_PATH, getScreenComponent(Screens.Signin))
    .use(PATHNAMES.SIGNUP_PATH, getScreenComponent(Screens.Signup))
    .use(PATHNAMES.CHAT_PATH, getScreenComponent(Screens.Chat))
    .use(PATHNAMES.PROFILE_PATH, getScreenComponent(Screens.Profile))
    .use(PATHNAMES.PATH_NOT_FOUND, getScreenComponent(Screens.PathNotFound))
    .start();
});
