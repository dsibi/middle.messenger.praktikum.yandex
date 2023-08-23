import Handlebars from "handlebars";

export default function authPage() {
  const template = Handlebars.compile(tmpl);
  const result = template({
    inputs: [
      {
        name: "login",
        label: "Login",
        type: "text",
        placeholder: "Enter your login",
        value: "",
        disabled: "",
        required: "required",
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        value: "",
        disabled: "",
        required: "required",
      },
    ].map((input) => input(input)),
    button: button({
      type: "submit",
      id: "auth-submit",
      name: "Авторизоваться",
    }),
  });

  document.querySelector("#app").innerHTML = result;
  document
    .querySelector("#auth-form")
    .addEventListener("submit", authoriseFormHandler);
  document
    .querySelector("#back-to-registration")
    .addEventListener("click", () => changePathName("registration"));
}
