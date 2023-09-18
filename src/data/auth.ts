import { InputProps } from "../components/form/input";

export let inputsData: InputProps[] = [
  {
    label: "Login",
    name: "login",
    type: "text",
    error: "",
    value: "",
    // validate: isValidLogin,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    error: "",
    value: "",
    // validate: isValidPassword,
  },
];
