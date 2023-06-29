import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  // root: resolve(__dirname, "src"),
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        registation: resolve(
          __dirname,
          "src/pages/registration/registration.html"
        ),
        chats: resolve(__dirname, "src/pages/chats/chats.html"),
        error404: resolve(__dirname, "src/pages/error/404.html"),
        error500: resolve(__dirname, "src/pages/error/500.html"),
        settings: resolve(__dirname, "src/pages/settings/settings.html"),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/components"),
      context: {
        fields: [
          { label: "First Name", id: "first_name", value: "Dmitry" },
          { label: "Second Name", id: "second_name", value: "Sib" },
          { label: "Login", id: "login", value: "dimas" },
          { label: "Email", id: "email", value: "dimas@dimas.world" },
          { label: "Password", id: "password", value: "dimas.world" },
          { label: "Phone", id: "phone", value: "+7-777-777-7777" },
        ],
        fieldsToEdit: [
          { label: "First Name", id: "first_name", value: "Dmitry" },
          { label: "Second Name", id: "second_name", value: "Sib" },
          { label: "Display Name", id: "display_name", value: "Dmitry Sib" },
          { label: "Login", id: "login", value: "dimas" },
          { label: "Email", id: "email", value: "dimas@dimas.world" },
          { label: "Phone", id: "phone", value: "+7-777-777-7777" },
        ],
        passToEdit: [
          { label: "Old Password", id: "oldPassword" },
          { label: "New Password", id: "newPassword" },
        ],
        btns: {
          logInBtn: "LogIn",
          sgnUpBtn: "SignUp",
          regBtn: "Register",
          setBtn: "Settings",
          submitBtn: "Save",
          cancelBtn: "Cancel",
        },
      },
    }),
  ],
});
