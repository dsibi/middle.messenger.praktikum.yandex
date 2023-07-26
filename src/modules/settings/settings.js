function editStart(item) {
  setColor(item, true);
  setTimeout(setColor, 3000, item, false);
  item.removeAttribute("readonly");
}

function setColor(item, arg) {
  if (arg) {
    item.style.backgroundColor = "yellow";
    item.style.borderColor = "red";
  } else {
    item.style.backgroundColor = "white";
    item.style.borderColor = "gray";
  }
}
window.editStart = editStart;
