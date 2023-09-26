import Router from "./utils/router";
import AuthPage from "./pages/auth";
import Error404 from "./pages/errors/404";
import Error500 from "./pages/errors/500";
import PfPage from "./pages/profile";
import ChatsPage from "./pages/chats";
import RegPage from "./pages/reg";

window.addEventListener("DOMContentLoaded", async () => {
  Router.use("/", AuthPage)
    .use("/login", AuthPage)
    .use("/signup", RegPage)
    .use("/settings", PfPage)
    .use("/404", Error404)
    .use("/500", Error500)
    .use("/chats", ChatsPage)
    .start();
});
