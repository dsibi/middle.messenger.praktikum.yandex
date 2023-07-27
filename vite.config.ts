// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "vite";
import handlebars from "./vite-plugin-handlebars-precompile";

export default defineConfig({
  root: "./",
  build: {
    outDir: "dist",
  },
  publicDir: "static",
  plugins: [handlebars()],
});
