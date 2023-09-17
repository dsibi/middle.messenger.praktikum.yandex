import Block from "./utils/Block";
import AuthPage from "./pages/auth";

function renderPage(block: Block) {
  const root = document.querySelector("#app");
  if (root) {
    root.innerHTML = "";
    root.appendChild(block.getContent()!);
  }
  block.dispatchComponentDidMount();
  return root;
}

renderPage(new AuthPage());
