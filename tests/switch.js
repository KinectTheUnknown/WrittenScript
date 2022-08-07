const test = require("ava").default
const {macros: {shouldParseAs: shouldParseAs}} = require("./common.js");

test("Switch: empty", shouldParseAs, "SWITCH TRUE DO END", "switch (true) {\n\n}")
/** @type {[string, string, string, string][]} */
const cases = [
  ["CASE ONE EOL", "ONE", "case 1:", "1"],
  ["CASE TWO EOL", "TWO", "case 2:", "2"],
  ["CASE THREE EOL", "THREE", "case 3:", "3"],
]
/** @type {[string, string, string, string]} */
const defaultCase = ["DEFAULT", "ZERO", "default:", "0"]

for (let caseAmount = 0; caseAmount < cases.length; caseAmount++) {
  const casesList = cases.slice(0, caseAmount + 1)
  for (let shouldIncludeDefault = 0; shouldIncludeDefault < 2; shouldIncludeDefault++) {
    if (shouldIncludeDefault === 1) {
      casesList.push(defaultCase)
    }

    test(`Switch: ${caseAmount + 1} case(s) with${shouldIncludeDefault === 1 ? "" : "out"}`, shouldParseAs,
`SWITCH TRUE DO
${cases.map(c => `${c[0]}\n${c[1]}`).join("\n")}
END`,
`switch (true) {
${cases.map(c => `${c[2]}\n${c[3]}`).join("\n")}
}`)
  }
}