const test = require("ava").default
const {macros: {shouldParseAs, shouldNotParse}} = require("./common.js");
const decl = [
  "CONST ", "LET ", "VAR ", ""
]
const keywords = [
  "CONST",
  "LET",
  "TO",
  "arguments", "await",
  "break",
  "case", "catch", "class", "const", "continue",
  "debugger", "default", "delete", "do",
  "else", "enum", "eval", "export", "extends",
  "false", "finally", "for", "function",
  "if", "implements", "import", "in", "instanceof", "interface",
  "let",
  "new", "null",
  "package", "private", "protected", "public",
  "return",
  "static", "super", "switch",
  "this", "throw", "true", "try", "typeof",
  "var", "void",
  "while", "with",
  "yield"
]

for (const d of decl) {
  test(`Assignment: ${d.trim() || "SET"}`, shouldParseAs, `${d}foo TO ONE`, `${d.toLowerCase()}foo = 1`)
}

for (const d of decl) {
  if (d === "") continue;
  test(`Assignment: Declare - ${d.trim() || "SET"}`, shouldParseAs, `${d}foo`, `${d.toLowerCase()}foo`)
}

test(`Assignment: Chained`, shouldParseAs, `CONST foo TO bar TO ONE`, `const foo = bar = 1`)

for (const [i, kw] of keywords.entries()) {
  test(`Assignment: Invalid - Keyword ${i}-1` , shouldNotParse, `CONST ${kw} TO ONE`)
}