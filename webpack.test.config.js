const path = require("path");
const { FilepathPlugin } = require("./index");

module.exports = {
  entry: "./test/index.js",
  output: {
    filename: "test.js",
    path: path.resolve(__dirname, "ignore"),
  },
  plugins: [new FilepathPlugin({ maxPathLength: 50 })],
};
