// eslint-disable-next-line import/no-extraneous-dependencies
import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "./vite-plugin-handlebars-precompile";

export default defineConfig({
  build: {
    outDir: resolve(__dirname, "dist"),
  },
  plugins: [handlebars()],
});
