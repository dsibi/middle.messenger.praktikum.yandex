/* eslint-disable @typescript-eslint/semi */
function editStart (item: HTMLElement): void {
  setColor(item, true);
  setTimeout(setColor, 3000, item, false);
  item.removeAttribute('readonly');
}

function setColor (item: HTMLElement, arg: boolean): void {
  if (arg) {
    item.style.backgroundColor = 'yellow';
    item.style.borderColor = 'red';
  } else {
    item.style.backgroundColor = 'white';
    item.style.borderColor = 'gray';
  }
}
window.editStart = editStart;
