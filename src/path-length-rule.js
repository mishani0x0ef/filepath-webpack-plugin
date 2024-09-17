import { resolve } from "path";
import { log } from "./log-utils";

function isBase64(path) {
  return path.startsWith("data:");
}

export function pathLengthRule(compilation, options) {
  const { maxPathLength, failOnError, pluginName } = options;
  const basePath = resolve("./");

  const tooLongPaths = compilation.modules
    .map((module) => module.resource)
    .filter((module) => module)
    .filter((module) => !module.includes("node_modules"))
    .filter((module) => !isBase64(module))
    .map((module) => module.substring(basePath.length))
    .filter((module) => module.length > maxPathLength)
    .map((module) => module.split("\\").join("/"))
    .map((module) => ({
      path: `.${module}`,
      length: module.length,
    }));

  if (tooLongPaths.length < 1) {
    return;
  }

  const message =
    `${pluginName}\r\n` +
    `${tooLongPaths.length} path(s) have more than ${maxPathLength} symbols.\r\n` +
    `Please make sure to reduce nesting or make folder and file names shorter:\r\n` +
    JSON.stringify(tooLongPaths, null, 2);

  log(message, compilation, failOnError);
}
