import { InputProps } from "../components/form/input";
import {
  isValidEmail,
  isValidLogin,
  isValidName,
  isValidPassword,
  isValidPhone,
} from "../utils/validation";

export let inputsData: InputProps[] = [
  {
    label: "First Name",
    name: "first_name",
    type: "text",
    error: "",
    value: "",
    validate: isValidName,
  },
  {
    label: "Second Name",
    name: "second_name",
    type: "text",
    error: "",
    value: "",
    validate: isValidName,
  },
  {
    label: "Login",
    name: "login",
    type: "text",
    error: "",
    value: "",
    validate: isValidLogin,
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    error: "",
    value: "",
    validate: isValidEmail,
  },
  {
    label: "Phone",
    name: "phone",
    type: "text",
    error: "",
    value: "",
    validate: isValidPhone,
  },
  {
    label: "Password",
    name: "password",
    type: "text",
    error: "",
    value: "",
    validate: isValidPassword,
  },
  {
    label: "Password (repeat)",
    name: "password_repeat",
    type: "text",
    error: "",
    value: "",
    validate: isValidPassword,
  },
];
