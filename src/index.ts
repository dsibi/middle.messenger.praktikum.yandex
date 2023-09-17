import Block from "./utils/Block";
// import AuthPage from "./pages/auth";
// import Error404 from "./pages/errors/404";
import Error500 from "./pages/errors/500";

function renderPage(block: Block) {
  const root = document.querySelector("#app");
  if (root) {
    root.innerHTML = "";
    root.appendChild(block.getContent()!);
  }
  block.dispatchComponentDidMount();
  return root;
}

// renderPage(new AuthPage());
renderPage(new Error500());
