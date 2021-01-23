export function log(level, message, compilation) {
  const { errors, warnings } = compilation;

  switch (level) {
    case "error":
      errors.push(new Error(message));
      break;
    case "warn":
      warnings.push(message);
      break;
    default:
      console.info(message);
      break;
  }
}
