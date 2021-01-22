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

The plugin will warn you if any path in your project exceeds the maximum length. Just add the plugin to your `webpack` config as follows:

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

| Name            | Type             | Default  | Description                                                                                                                                     |
| --------------- | ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `basePath`      | `string`         | `'./'`   | Path that identify where analyze should start (relative to application root).                                                                   |
| `maxPathLength` | `number`         | `200`    | Maximum count of symbols allowed in the relative path. If path length will exceed this value - build will notify you according to `level`.      |
| `level`         | `'warn','error'` | `'warn'` | Identifies action that should be done if path don't satisfy rules: `warn` - warning that allow build to proceed; `error` - will fail the build. |

Please look at the example that shows how to use options:

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
      maxPathLength: 50,
      level: "error",
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
