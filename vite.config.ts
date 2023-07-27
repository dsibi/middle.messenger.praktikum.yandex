// eslint-disable-next-line import/no-extraneous-dependencies
import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "./vite-plugin-handlebars-precompile";

export default defineConfig({
  root: "./",
  build: {
    outDir: resolve(__dirname, "dist"),
  },
  publicDir: "mypublic",
  plugins: [handlebars()],
});
