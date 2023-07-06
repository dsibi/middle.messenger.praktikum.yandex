"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onClickField = exports.overOutField = void 0;
const setColorFields_1 = require("./setColorFields");
function overOutField(inputField) {
    inputField.onmouseover = function () {
        if (!inputField.disabled) {
            (0, setColorFields_1.default)(inputField, true);
        }
    };
    inputField.onmouseout = function () {
        if (!inputField.disabled) {
            (0, setColorFields_1.default)(inputField, false);
        }
    };
}
exports.overOutField = overOutField;
function onClickField(inputField) {
    let defLgField = (inputField.value = "login/email/phone");
    inputField.onclick = function () {
        if (defLgField == inputField.value) {
            inputField.value = "";
        }
        else {
            return inputField.value;
        }
    };
}
exports.onClickField = onClickField;
//# sourceMappingURL=inputFields.js.map