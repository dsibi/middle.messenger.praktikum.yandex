import { defineConfig } from "vite";
import handlebars from "./vite-plugin-handlebars-precompile";

export default defineConfig({
  root: "src",
  build: {
    outDir: "dist",
  },
  plugins: [handlebars()],
});
