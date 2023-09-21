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
    validate: isValidName,
  },
  {
    label: "Second Name",
    name: "second_name",
    type: "text",
    validate: isValidName,
  },
  {
    label: "Login",
    name: "login",
    type: "text",
    validate: isValidLogin,
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    validate: isValidEmail,
  },
  {
    label: "Phone",
    name: "phone",
    type: "text",
    validate: isValidPhone,
  },
  {
    label: "Password",
    name: "password",
    type: "text",
    validate: isValidPassword,
  },
  {
    label: "Password (repeat)",
    name: "password_repeat",
    type: "text",
    validate: isValidPassword,
  },
];
