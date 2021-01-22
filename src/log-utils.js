export function log(message, ...other) {
  console.log(message, ...other);
}

export function warn(message, ...other) {
  console.warn("\x1b[33m%s\x1b[0m", message, ...other);
}
