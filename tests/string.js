const test = require("ava")
const {parse} = require("../")
function macro(t, str, expected) {
  t.assert(parse(str).succeeded() === expexted, `Should${expected ? " " : " not"} parse successfully`)
}

test("String: Alphabetic", macro, "STR text END", true)
test("String: Numeric", macro, "STR 1234567890 END", true)
test("String: Alphanumeric", macro, "STR text 12345 END", true)
test("String: Whitespaces + Alphanumeric", macro, "STR s  p a  c e  s 12 3  4   5", true)
test("String: Missing END", macro, "STR text", false)
test("String: Invalid END", macro, "STR text sEND", false)
