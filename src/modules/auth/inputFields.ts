import setColor from "./setColorFields";

export function overOutField(inputField: HTMLElement) {
  inputField.onmouseover = function () {
    if (!(inputField as any).disabled) {
      setColor(inputField, true);
    }
  };

  inputField.onmouseout = function () {
    if (!(inputField as any).disabled) {
      setColor(inputField, false);
    }
  };
}

export function onClickField(inputField) {
  let defLgField = (inputField.value = "login/email/phone");
  inputField.onclick = function () {
    if (defLgField == inputField.value) {
      inputField.value = "";
    } else {
      return inputField.value;
    }
  };
}
