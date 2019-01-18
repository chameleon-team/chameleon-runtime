export function getViewportSize() {
  let viewportWidth = 0;
  let viewportHeight = 0;

  let documentElementClientWidth = document.documentElement && document.documentElement.clientWidth;
  let documentElementClientHeight = document.documentElement && document.documentElement.clientHeight;
  let bodyClientWidth = document.body && document.body.clientWidth;
  let bodyClientHeight = document.body && document.body.clientHeight;

  viewportWidth = window.innerWidth || documentElementClientWidth || bodyClientWidth;
  viewportHeight = window.innerHeight || documentElementClientHeight || bodyClientHeight;

  return {
    viewportWidth,
    viewportHeight
  }
}