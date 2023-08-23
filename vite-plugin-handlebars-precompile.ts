import Handlebars from "handlebars";
import { PluginOption } from "vite";

export default function handlebars(): PluginOption {
  const fileRegExp = /\.hbs$|\.handlebars$/;
  return {
    name: "vite-plugin-handlebars-precompile",
    transform(src: string, id: string) {
      if (!fileRegExp.test(id)) {
        return;
      }
      // vite transform .hbs to .js
      const code = `
            import Handlebars from 'handlebars';
            export default Handlebars.template(${Handlebars.precompile(src)});
        `;
      return {
        code,
      };
    },
  };
}
