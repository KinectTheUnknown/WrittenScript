const test = require("ava").default
const {macros: {shouldParseAs: shouldParseAs}} = require("./common.js");

test("String: Alphabetic", shouldParseAs, "STR text END", '"text"')
test("String: Numeric", shouldParseAs, "STR 1234567890 END", '"1234567890"')
test("String: Alphanumeric", shouldParseAs, "STR text 12345 END", '"text 12345"')
test("String: Whitespaces + Alphanumeric", shouldParseAs, "STR s  p a  c e  s 12 3  4   5 END", '"s  p a  c e  s 12 3  4   5"')