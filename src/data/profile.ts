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
    value: "Dmitry",
    validate: isValidName,
  },
  {
    label: "Second Name",
    name: "second_name",
    type: "text",
    value: "Sib",
    validate: isValidName,
  },
  {
    label: "Login",
    name: "login",
    type: "text",
    value: "DmSib",
    validate: isValidLogin,
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    value: "dmsib@dmsib.ru",
    validate: isValidEmail,
  },
  {
    label: "Phone",
    name: "phone",
    type: "text",
    value: "+7-777-777-7777",
    validate: isValidPhone,
  },
  {
    label: "Old password",
    name: "oldPassword",
    type: "password",
    value: "Qwerty12345",
    validate: isValidPassword,
  },
  {
    label: "New password",
    name: "newPassword",
    type: "password",
    value: "Qwerty12345",
    validate: isValidPassword,
  },
];
