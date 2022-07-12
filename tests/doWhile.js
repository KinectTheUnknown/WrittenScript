const test = require("ava").default
const {macros: {shouldParseAs: shouldParseAs, spacingTest}} = require("./common.js");

test("Do While: noop", shouldParseAs, `DO WHILE TRUE END`, "do {\n\n} while (true)");
test("Do While: filled", shouldParseAs, 
`DO
  ONE ADD ONE EOL
  TWO ADD TWO
WHILE TRUE END`,
`do {
1 + 1
2 + 2
} while (true)`)

test("Do While: Invalid - Spaces", spacingTest, "DO ONE WHILE TRUE END")