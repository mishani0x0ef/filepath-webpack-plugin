import { warn, info, error } from "./log-utils";
import { getPathsLongerThan } from "./path-utils";
import validateOptions from "schema-utils";

const schema = {
  type: "object",
  properties: {
    basePath: {
      type: "string",
    },
    maxPathLength: {
      type: "number",
    },
    level: {
      type: "string",
    },
  },
};

const defaults = {
  basePath: "./",
  maxPathLength: 200,
  level: "warn",
};

const pluginName = "FilepathPlugin";

export class FilepathPlugin {
  constructor(options) {
    validateOptions(schema, options, pluginName);
    this.options = { ...defaults, ...options };
  }

  apply(compiler) {
    compiler.hooks.emit.tapPromise(pluginName, (_) => this._checkPathLength());
  }

  async _checkPathLength() {
    const { basePath, maxPathLength, level } = this.options;
    const nonCompliantPaths = await getPathsLongerThan(basePath, maxPathLength);

    if (!nonCompliantPaths.length > 0) {
      return;
    }

    const message =
      `WARNING: there are ${nonCompliantPaths.length} path(s) have more than ${maxPathLength} symbols.\r\n` +
      `Please make sure to reduce nesting or make folder and file names shorter:\r\n`;

    switch (level) {
      case "error":
        error(message);
        info(nonCompliantPaths);
        throw new Error(message);
      case "warn":
        warn(message);
        info(nonCompliantPaths);
        break;
      default:
        info(message, nonCompliantPaths);
        break;
    }
  }
}
