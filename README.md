# Filepath Webpack Plugin

A simple plugin for checking paths length in your project

## Install

```sh
npm install --save-dev filepath-webpack-plugin
```

```sh
yarn add --dev filepath-webpack-plugin
```

This is a webpack plugin that checks your source code for long paths. It can be useful for projects that have deep nesting in their structure or have long file/folder names. This plugin will help to warn developers about too long paths before it [caused an issue](https://stackoverflow.com/questions/22575662/filename-too-long-in-git-for-windows/22575737#22575737) on other machines.

## Usage

The plugin will show a build warning if any path in your project exceeds the maximum length. Just add the plugin to your `webpack` config as follows:

**webpack.config.js**

```js
const FilepathPlugin = require("filepath-webpack-plugin");

module.exports = {
  entry: "index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js",
  },
  plugins: [new FilepathPlugin()],
};
```

## Options

You can pass configuration options to `filepath-webpack-plugin`. Allowed values are as follows:

| Name            | Type      | Default | Description                                                                                                                                                                                                          |
| --------------- | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maxPathLength` | `number`  | `200`   | Maximum count of symbols allowed in the module's path. If path length will exceed this value - you will see a warning or an error depending on `failOnError`. Path length calculated relatively to the project root. |
| `failOnError`   | `boolean` | `false` | Identifies action that should be done if path doesn't satisfy rules: `false` - warning; `true` - will fail the build.                                                                                                  |

Please take a look at the example of how to use options:

**webpack.config.js**

```js
const FilepathPlugin = require("filepath-webpack-plugin");

module.exports = {
  entry: "index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js",
  },
  plugins: [
    new FilepathPlugin({
      maxPathLength: 100,
      failOnError: true,
    }),
  ],
};
```

Example of output that generated when a path does not satisfy rules:

**terminal output**

```js
WARNING in FilepathPlugin
2 path(s) have more than 50 symbols.
Please make sure to reduce nesting or make folder and file names shorter:
[
  {
    "length": 89,
    "path": "./test/non-compliant/very-long-folder-name-that-wont-be-compliant-with-length-restriction"
  },
  {
    "length": 98,
    "path": "./test/non-compliant/very-long-folder-name-that-wont-be-compliant-with-length-restriction/other.js"
  }
]
```
