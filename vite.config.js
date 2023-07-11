import { resolve } from "path";
// eslint-disable-next-line import/no-extraneous-dependencies
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
        bestfriendChat: [
          {
            msgText: "Dude you should stop drinking",
            time: new Date("July 01, 2023 10:24:00"),
            isInbox: "bubble sender",
            status: "read",
          },
          {
            msgText: "Why?",
            time: new Date("July 01, 2023 10:25:00"),
            isInbox: "bubble recipient",
            status: "read",
          },
          {
            msgText: "Remember last night?",
            time: new Date("July 01, 2023 10:26:00"),
            isInbox: "bubble sender",
            status: "read",
          },
          {
            msgText: "Yeah, but I wasn't really drunk",
            time: new Date("July 01, 2023 10:27:00"),
            isInbox: "bubble recipient",
            status: "read",
          },
          {
            msgText:
              "DUDE U ALMOST JUMP DOWN FROM THE 15TH FLOOR SINGING I BELIEVE I CAN FLY!",
            time: new Date("July 01, 2023 10:28:00"),
            isInbox: "bubble sender",
            status: "read",
          },
        ],
      },
    }),
  ],
});
