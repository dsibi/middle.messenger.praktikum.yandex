import main from "./pages/main/main.hbs";
// import chatPic from '../../../static/chatPic.svg'
// import './login.less'

function returnMain() {
  return main();
}

const root = document.getElementById("app");
root.innerHTML = returnMain();
