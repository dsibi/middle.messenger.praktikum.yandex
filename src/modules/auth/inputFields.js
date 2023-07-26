import setColor from "./setColorFields";

export function overOutField(inputField) {
  inputField.onmouseover = function () {
    if (!this.disabled) {
      setColor(this, true);
    }
  };

  inputField.onmouseout = function () {
    if (!this.disabled) {
      setColor(this, false);
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
