export function log(message, compilation, failOnError) {
  const log = failOnError ? compilation.errors : compilation.warnings;
  log.push(message);
}
