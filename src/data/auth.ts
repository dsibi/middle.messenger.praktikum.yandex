import { InputProps } from "../components/form/input";
import { isValidLogin, isValidPassword } from "../utils/validation";

export let inputsData: InputProps[] = [
  {
    label: "Login",
    name: "login",
    type: "text",
    errorText: "",
    value: "",
    validate: isValidLogin,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    errorText: "",
    value: "",
    validate: isValidPassword,
  },
];
