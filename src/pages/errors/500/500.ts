/* eslint-disable @typescript-eslint/semi */
import e404 from "../../../components/error.hbs";
import imgPath from "../../../../static/img/problem.png";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app") as HTMLInputElement;
  const result = e404({
    desc: "Ошибка 500 - сервер недоступен",
    imgPath: imgPath,
    imgWidth: "170px",
  });
  root.innerHTML = result;
});
