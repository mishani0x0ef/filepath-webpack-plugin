const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

const { FilepathPlugin } = require("../index");

function getPath(relativePath) {
  return path.resolve(__dirname, relativePath);
}

function getWebpackOptions(pluginOptions, webpackOptions) {
  return {
    entry: getPath("./test-data/path-test.js"),
    output: {
      path: outputDir,
    },
    mode: "development",
    plugins: [new FilepathPlugin(pluginOptions)],
    ...webpackOptions,
  };
}

function runWebpack(options) {
  return new Promise((resolve, reject) => {
    webpack(options, (error, stats) => {
      if (error) {
        reject(error);
      } else if (stats.hasErrors()) {
        reject(stats.toString());
      }

      resolve(stats.toJson());
    });
  });
}

const outputDir = getPath("dist");
const maxPathLength = "/test/test-data/dependency/module-a.js".length;

describe("path-length-rule", () => {
  it("WHEN maxPathLength has incorrect data type SHOULD throw validation error", async () => {
    const options = {
      maxPathLength: "INVALID-VALUE",
    };

    expect(() => new FilepathPlugin(options)).toThrowError(
      "options.maxPathLength should be a number"
    );
  });

  it("WHEN failOnError has incorrect data type SHOULD throw validation error", async () => {
    const options = {
      failOnError: "INVALID-VALUE",
    };

    expect(() => new FilepathPlugin(options)).toThrowError(
      "options.failOnError should be a boolean"
    );
  });

  it("WHEN contains extra options SHOULD throw validation error", async () => {
    const options = {
      extraOptionThatNotExistsInConfigSchema: "value",
    };

    expect(() => new FilepathPlugin(options)).toThrowError(
      "options has an unknown property 'extraOptionThatNotExistsInConfigSchema'"
    );
  });

  it("WHEN path length is equal maxPathLength SHOULD not indicate error", async () => {
    const options = getWebpackOptions({
      maxPathLength: maxPathLength,
      failOnError: true,
    });

    await expect(runWebpack(options)).resolves.toBeDefined();
  });

  it("WHEN path is longer than maxPathLength and failOnError disabled SHOULD not indicate error", async () => {
    const options = getWebpackOptions({
      maxPathLength: maxPathLength - 1,
      failOnError: false,
    });

    await expect(runWebpack(options)).resolves.toBeDefined();
  });

  it("WHEN path is longer than maxPathLength and failOnError enabled SHOULD indicate error", async () => {
    const options = getWebpackOptions({
      maxPathLength: maxPathLength - 1,
      failOnError: true,
    });

    await expect(runWebpack(options)).rejects.toEqual(
      expect.stringContaining("ERROR in FilepathPlugin")
    );
  });

  afterAll(() => {
    fs.rmdirSync(outputDir, { recursive: true, force: true });
  });
});
