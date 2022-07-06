const test = require("ava").default
const {macros: {shouldParseAs, shouldNotParse, spacingTest}} = require("./common.js");

test("If: Noop", shouldParseAs,
`IF TRUE DO
ELSE IF TRUE DO
ELSE IF TRUE DO
ELSE DO
END`,
`if (true) {

} else if (true) {

} else if (true) {

} else {

}`)
test("IF: Completely filled", shouldParseAs, 
`IF num SEQ ZERO DO
  SET str TO STR foo END
ELSE IF num SEQ ONE DO
  SET str TO STR bar END
ELSE IF num SEQ TWO DO
  SET str TO STR baz END
ELSE DO
  SET str TO STR qux END
END`,
`if (num === 0) {
 str = "foo"
} else if (num === 1) {
 str = "bar"
} else if (num === 2) {
 str = "baz"
} else {
 str = "qux"
}`)

test("If: Invalid - Spaces", spacingTest, "IF TRUE DO ELSE IF TRUE DO ELSE IF TRUE ELSE DO END")