import validateOptions from "schema-utils";
import { pathLengthRule } from "./path-length-rule";

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
    this.options = { ...defaults, ...options, pluginName };
  }

  apply(compiler) {
    compiler.hooks.emit.tapPromise(pluginName, (compilation) =>
      Promise.all([pathLengthRule(compilation, this.options)])
    );
  }
}
