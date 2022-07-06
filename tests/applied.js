const test = require("ava").default
const {macros: {shouldParseAs}} = require("./common.js");

test("Fibonacci", shouldParseAs,
`CONST cache TO ARR ONE SEP ONE END EOL
FN fibonacci num DO
  IF cache OF length GT num DO
    RETURN cache OF at CALL num END
  END
  RETURN fibonacci CALL num SUB ONE END ADD fibonacci CALL num SUB TWO END
END
`,
`const cache = [1, 1];
function fibonacci(num) {
if (cache.length > num) {
return (cache.at)(num)
}
return (fibonacci)(num - 1) + (fibonacci)(num - 2)
}`)