/* eslint-disable @typescript-eslint/semi */
import e404 from "../../../components/error.hbs";
import imgPath from "../../../../static/img/error-404.png";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app") as HTMLInputElement;
  const result = e404({
    desc: "Ошибка 404 - страницы не существует",
    imgPath: imgPath,
    imgWidth: "200px",
  });
  root.innerHTML = result;
});
