import logoPath from "../static/img/logo.png";
import mainPage from "./pages/main/main";
// import regPage from "./pages/reg/reg";
// import mainPage from "./pages/settings/settings";
import "./default.css";

document.querySelector('[rel="icon"]').setAttribute("href", logoPath);

mainPage();
