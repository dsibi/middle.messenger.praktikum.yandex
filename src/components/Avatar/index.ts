import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";
import { AvatarInput } from "./AvatarInput";
import { PATHNAMES } from "../../utils/paths";
import { callPutAvaMethod } from "../../Api/Profile";

export interface AvatarProps {
  avaPath: string;
}

export class Avatar extends Block<AvatarProps> {
  init() {
    this.children.avaInput = new AvatarInput({
      events: {
        // change: (event: any) => console.log(event),
        change: () => {
          let image = document.getElementById("avatar") as HTMLImageElement;
          let avatar = document.getElementById("file") as HTMLInputElement;
          if (avatar && avatar.files) {
            let file = avatar.files[0];
            image.src = URL.createObjectURL(file);
            const formData = new FormData();
            if (avatar && file) {
              // formData.append("avatar", (avatar as any).files[0]);
              formData.append("avatar", file);
              // console.log(file);
              // console.log(formData);
              callPutAvaMethod("profile/avatar", formData);
            }
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
