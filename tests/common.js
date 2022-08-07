const { match, parseMatch } = require("../");

module.exports = {
  macros: {
    shouldParse(t, str, startingRule) {
      const m = match(str, startingRule);
      
      const r = t.true(m.succeeded(), `Expected "${str}" to parse, but it failed`)

      return {result: r, match: m}
    },
    shouldParseAs(t, str, expected, startingRule) {
      const {shouldParse} = module.exports.macros
      const {result, match: m} = shouldParse(t, str, startingRule)

      if (!result) return;
      
      const actual = parseMatch(m);
      t.true(actual === expected, `Should parse "${str}" as "${expected}", but got "${actual}"`)
    },
    shouldNotParse(t, str, startingRule) {
      const m = match(str, startingRule);
      const parsed = m.failed() ? null : parseMatch(m);

      t.true(m.failed(), `Expected "${str}" to not parse, but got ${parsed}`);
    },
  } 
}