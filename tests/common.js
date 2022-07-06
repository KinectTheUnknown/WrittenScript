const { match, parseMatch } = require("../");

/** @type {{ macros: Record<string, (t: import("ava").ExecutionContext, ...args: any) => void> }} macros */
module.exports = {
  macros: {
    shouldParseAs(t, str, expected, startingRule) {
      const m = match(str, startingRule);
      if (!t.true(m.succeeded(), `Expected "${str}" to parse, but it failed`)) {
        return;
      };
      const actual = parseMatch(m);
      t.true(actual === expected, `Should parse "${str}" as "${expected}", but got "${actual}"`)
    },
    shouldNotParse(t, str, startingRule) {
      const m = match(str, startingRule);
      const parsed = m.failed() ? null : parseMatch(m);

      t.true(m.failed(), `Expected "${str}" to not parse, but got ${parsed}`);
    },
    spacingTest(t, str, startingRule) {
      const {shouldNotParse} = module.exports.macros;
      const spaces = str.matchAll(/ +/g);
      for (const match of spaces) {
        const index = match.index
        const subStr = str.slice(0, index) + str.slice(index + 1);
        shouldNotParse(t, subStr, startingRule);
      }

      shouldNotParse(t, str.replaceAll(/ /g, ""), startingRule);
    }
  } 
}