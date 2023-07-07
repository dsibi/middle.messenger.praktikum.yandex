/* eslint-disable @typescript-eslint/semi */
import setColor from './setColorFields';

export function overOutField (inputField: HTMLSelectElement) {
  inputField.onmouseover = function () {
    if (!inputField.disabled) {
      setColor(inputField, true);
    }
  };

  inputField.onmouseout = function () {
    if (!inputField.disabled) {
      setColor(inputField, false);
    }
  };
}

export function onClickField (inputField: HTMLSelectElement) {
  const defLgField = (inputField.value = 'login/email/phone');
  inputField.onclick = function () {
    if (defLgField == inputField.value) {
      inputField.value = '';
    } else {
      return inputField.value;
    }
  };
}
