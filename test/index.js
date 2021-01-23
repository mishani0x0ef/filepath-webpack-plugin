const compliant = require("./compliant/some");
const nonCompliant = require("./non-compliant/very-long-folder-name-that-wont-be-compliant-with-length-restriction/some");
const axios = require("axios");

console.log("Hello world!", compliant.test, nonCompliant.test);
axios.get("test");
