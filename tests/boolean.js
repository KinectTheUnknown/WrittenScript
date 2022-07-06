const test = require("ava").default
const {macros: {shouldParseAs}} = require("./common.js");

test("Boolean: True", shouldParseAs, "TRUE", "true")
test("Boolean: False", shouldParseAs, "FALSE", "false")