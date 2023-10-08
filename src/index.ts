import Router from "./utils/router";
import AuthPage from "./pages/auth";
import Error404 from "./pages/errors/404";
import Error500 from "./pages/errors/500";
import ProfileWithStore from "./pages/profile";
import ChatsPageWithStore from "./pages/chats";
import RegPage from "./pages/reg";
import AuthController from "./controllers/Auth-controller";

// DOMContentLoaded срабатывает на построение DOM-дерева
window.addEventListener("DOMContentLoaded", async () => {
  Router.use("/", AuthPage)
    .use("/login", AuthPage)
    .use("/signup", RegPage)
    .use("/settings", ProfileWithStore)
    .use("/404", Error404)
    .use("/500", Error500)
    .use("/chats", ChatsPageWithStore);
  await AuthController.isUserLoggedIn();
  Router.start();
});
