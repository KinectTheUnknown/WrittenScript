const test = require("ava").default
const {macros: {shouldParseAs: shouldParseAs, spacingTest}} = require("./common.js");

test("While: noop", shouldParseAs, `WHILE TRUE DO END`, "while (true) {\n\n}");
test("While: filled", shouldParseAs, 
`WHILE TRUE DO
  ONE ADD ONE EOL
  TWO ADD TWO
END`,
`while (true) {
1 + 1
2 + 2
}`)

test("While: Invalid - Spaces", spacingTest, "WHILE TRUE ONE ONE DO END")