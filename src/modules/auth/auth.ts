import { overOutField, onClickField } from "./inputFields";
import "./auth.css";
// import "../../default.css";

let lgField: HTMLElement = document.getElementById("login")!;
let pwField: HTMLElement = document.getElementById("password")!;

overOutField(lgField);
onClickField(lgField);

overOutField(pwField);
