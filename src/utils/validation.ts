const regexp = {
  name: /^[A-Z][a-zA-Z-\.]{1,}$/,
  login: /^[a-zA-Z][a-zA-Z0-9-_\.]{2,20}$/,
  email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
  password: /^(?=.*?[0-9])(?=.*?[A-Z])[a-zA-Z0-9]{8,40}$/,
  phone: /^[+|0-9][0-9]{9,15}$/,
  message: /^\w{1,}$/,
};

type ValiationType = (value: string) => string;

export const isValidName: ValiationType = (value) =>
  regexp.name.test(value)
    ? ""
    : "use Latin or Cyrillic characters, the first letter must be uppercase, without spaces, numbers and special characters (except hyphens)";

export const isValidLogin: ValiationType = (value) =>
  regexp.login.test(value)
    ? ""
    : "from 3 to 20 characters, use Latin characters, numbers, without spaces and special characters (except hyphens and underscores)";

export const isValidEmail: ValiationType = (value) =>
  regexp.email.test(value)
    ? ""
    : "use Latin characters, numbers, and special characters";

export const isValidPassword: ValiationType = (value) =>
  regexp.password.test(value)
    ? ""
    : "from 8 to 40 characters, at least one capital letter and a number are required";

export const isValidPhone: ValiationType = (value) =>
  regexp.phone.test(value)
    ? ""
    : "from 10 to 15 characters, consists of digits, can start with a plus";

export const isValidMessage: ValiationType = (value) =>
  regexp.message.test(value) ? "" : "the value cannot be empty";
