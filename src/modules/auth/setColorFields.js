export default function setColor(element, useHighlightColor) {
  if (useHighlightColor) {
    element.style.backgroundColor = "yellow";
    element.style.borderColor = "red";
  } else {
    element.style.backgroundColor = "white";
    element.style.borderColor = "gray";
  }
}
