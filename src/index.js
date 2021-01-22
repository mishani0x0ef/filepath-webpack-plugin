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
    compiler.hooks.emit.tapPromise(pluginName, (compilation) =>
      this._checkPathLength(compilation)
    );
  }

  async _checkPathLength({ errors, warnings }) {
    const { basePath, maxPathLength, level } = this.options;
    const nonCompliantPaths = await getPathsLongerThan(basePath, maxPathLength);

    if (!nonCompliantPaths.length > 0) {
      return;
    }

    const message =
      `${pluginName}\r\n` +
      `${nonCompliantPaths.length} path(s) have more than ${maxPathLength} symbols.\r\n` +
      `Please make sure to reduce nesting or make folder and file names shorter:\r\n` +
      JSON.stringify(nonCompliantPaths, null, 2);

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
}
