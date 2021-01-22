import { log, warn } from "./log-utils";
import { getPathsLongerThan } from "./path-utils";
import validateOptions from "schema-utils";

const schema = {
  type: "object",
  properties: {
    path: {
      type: "string",
    },
    maxPathLength: {
      type: "number",
    },
  },
};

const defaults = {
  path: "./",
  maxPathLength: 200,
};

const pluginName = "FilepathPlugin";

export class FilepathPlugin {
  constructor(options) {
    validateOptions(schema, options, pluginName);
    this.options = { ...defaults, ...options };
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(pluginName, (_, callback) => {
      this._checkPathLength()
        .then(() => callback())
        .catch((error) => {
          console.error(error);
          callback();
        });
    });
  }

  async _checkPathLength() {
    const { path, maxPathLength } = this.options;
    const nonCompliantPaths = await getPathsLongerThan(path, maxPathLength);

    if (!nonCompliantPaths.length > 0) {
      return;
    }

    warn(
      `WARNING: there are ${nonCompliantPaths.length} path(s) have more than ${maxPathLength} symbols.`,
      `\r\n`,
      `Please make sure to reduce nesting or make folder and file names shorter:`
    );
    log(nonCompliantPaths);
  }
}
