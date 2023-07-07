import logoPath from "../static/img/logo.png";
// import mainPage from "./pages/main/main";
import mainPage from "./pages/auth/auth";
// import mainPage from "./pages/settings/settings";
import "./default.css";

document.querySelector('[rel="icon"]').setAttribute("href", logoPath);

mainPage();
