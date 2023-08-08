import Block from "../../utils/Block";
import template from "./template.hbs";
import style from "./style.module.css";
import { Link } from "./Link";
import callMethod from "../../Api/ApiClient";
import { callGetMethod } from "../../Api/Profile";
import { PATHNAMES } from "../../utils/paths";

export interface SettingsProps {
  avaPath: string;
}

export class Settings extends Block<SettingsProps> {
  init() {
    this.children.profile = new Link({
      param: "Profile",
      events: {
        click: () => {
          callGetMethod("user", "GET", PATHNAMES.PROFILE_PATH);
        },
      },
    });
    this.children.logOut = new Link({
      param: "Log Out",
      events: {
        click: () => {
          callMethod("logout", "POST", PATHNAMES.SIGNIN_PATH);
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
