export function type(n) {
  return Object.prototype.toString.call(n).slice(8, -1)
}