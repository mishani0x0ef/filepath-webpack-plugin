import validateOptions from "schema-utils";
import { pathLengthRule } from "./path-length-rule";

const schema = {
  type: "object",
  properties: {
    maxPathLength: {
      type: "number",
    },
    failOnError: {
      type: "boolean",
    },
  },
  additionalProperties: false,
};

const defaults = {
  maxPathLength: 200,
  failOnError: false,
};

const pluginName = "FilepathPlugin";

export class FilepathPlugin {
  constructor(options) {
    validateOptions(schema, options, {
      name: pluginName,
      baseDataPath: "options",
    });

    this.options = { ...defaults, ...options, pluginName };
  }

  apply(compiler) {
    compiler.hooks.emit.tapPromise(pluginName, (compilation) =>
      Promise.all([pathLengthRule(compilation, this.options)])
    );
  }
}
