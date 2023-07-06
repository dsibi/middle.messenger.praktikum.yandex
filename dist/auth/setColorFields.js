"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setColor(element, useHighlightColor) {
    if (useHighlightColor) {
        element.style.backgroundColor = "yellow";
        element.style.borderColor = "red";
    }
    else {
        element.style.backgroundColor = "white";
        element.style.borderColor = "gray";
    }
}
exports.default = setColor;
//# sourceMappingURL=setColorFields.js.map