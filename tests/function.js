const test = require("ava").default
const {macros: {shouldParseAs}} = require("./common.js");

const params = ["bar", "baz", "bax", "qux", "quuz"]
/** @type {Map<string, [string, string]>} */
const bodies = new Map([
  ["Empty", ["", ""]],
  ["Single No Return", ["ONE ADD ONE", "1 + 1"]],
  ["Multi No Return", ["ONE ADD ONE EOL\nTWO ADD TWO", "1 + 1\n2 + 2"]],
  ["Single Return", ["RETURN ONE ADD ONE", "return 1 + 1"]],
  ["Multi Return", ["ONE ADD ONE EOL\nRETURN TWO ADD TWO", "1 + 1\nreturn 2 + 2"]],
])
/** @type {Map<string, [string, string, string?]>} */
const prefixes = new Map([
  // Since unnamed functions are not allowed on the top level of blocks, the startingRule will be set at Function instead
  ["Unnamed", ["UFN", "function ", "Function"]],
  ["Named", ["FN foo", "function foo"]],
]);
for (const [prefixTitle, [prefix, expectedPrefix, startingRule]] of prefixes.entries()) {
  for (let i = 0; i < params.length + 1; i++) {
    const selectedParams = params.slice(0, i)
    const paramList = selectedParams.join(" ")
    const expectedParams = selectedParams.join(", ")
    for (const [bodyTitle, [body, expectedBody]] of bodies.entries()) {
      test(`${prefixTitle} Function: ${bodyTitle} ${selectedParams.length} Parameter(s)`, shouldParseAs,
      `${prefix} ${paramList} DO ${body} END`,
      `${expectedPrefix}(${expectedParams}) {\n${expectedBody}\n}`,
      startingRule
      )
    }
  }
}
test("Arrow Function: Empty", shouldParseAs, `AFN DO END`, `() => {\n\n}`);
test("Arrow Function Single", shouldParseAs, `AFN DO ONE  END`, `() => 1`);
test("Arrow Function Single - 2", shouldParseAs, `AFN DO ONE ADD ONE END`, `() => 1 + 1`);