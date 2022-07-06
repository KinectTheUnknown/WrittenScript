const test = require("ava").default
const {macros: {shouldParseAs}} = require("./common.js");

const digits = ["ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"]
for (const [i, n] of digits.entries())
  test(`Number: Digit ${i}`, shouldParseAs, n, `${i}`)

const joinedDigits = digits.join(" ")
test("Number: Number", shouldParseAs, joinedDigits, "0123456789")
test("Number: Integer - Positive", shouldParseAs, "POS " + joinedDigits, "+(0123456789)")
test("Number: Integer - Negative", shouldParseAs, "NEG " + joinedDigits, "-(0123456789)")
test("Number: Float", shouldParseAs, joinedDigits + " DOT " + joinedDigits, "0123456789.0123456789")
test(
  "Number: BigInt",
  shouldParseAs,
  "BIG ONE EIGHT FOUR FOUR \
  SIX SEVEN FOUR FOUR ZERO \
  SEVEN THREE SEVEN ZERO NINE \
  FIVE FIVE ONE SIX ONE FIVE",
  "18446744073709551615n",
)
