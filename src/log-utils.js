export function info(message, ...other) {
  console.info(message, ...other);
}

export function warn(message, ...other) {
  console.warn("\x1b[33m", message, ...other);
  reset();
}

export function error(message, ...other) {
  console.error("\x1b[31m", message, ...other);
  reset();
}

function reset() {
  console.log("\x1b[0m");
}
