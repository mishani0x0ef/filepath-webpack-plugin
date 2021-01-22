const compliant = require("./compliant/some");
const nonCompliant = require("./non-compliant/very-long-folder-name-that-wont-be-compliant-with-length-restriction/some");

console.log("Hello world!", compliant.test, nonCompliant.test);
