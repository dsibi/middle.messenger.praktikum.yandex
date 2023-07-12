/* eslint-disable @typescript-eslint/semi */
export default function setColor (
  element: HTMLElement,
  useHighlightColor: boolean
): void {
  if (useHighlightColor) {
    element.style.backgroundColor = 'yellow';
    element.style.borderColor = 'red';
  } else {
    element.style.backgroundColor = 'white';
    element.style.borderColor = 'gray';
  }
}
