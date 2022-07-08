const test = require("ava").default
const {macros: {shouldParseAs}} = require("./common.js");

test("Object: Properties", shouldParseAs, 
`OBJ
  PROP foo TO STR bar END
  PROP baz158 TO SIX TWO SEVEN
  PROP obj TO OBJ
    PROP key TO STR val END
  END
END`,
`{
foo: "bar",
baz158: 627,
obj: {
key: "val"
}
}`)

test("Object: Methods", shouldParseAs,
`OBJ 
  FN foo bar baz DO
    foo SEQ STR number END
    baz TO foo ADD bar
    RETURN TRUE
  END
END`,
`{
foo(bar, baz) {
foo === "number"
baz = foo + bar
return true
}
}`)

test("Object: Mix", shouldParseAs,
`OBJ PROP foo TO STR bar END
  PROP 160 TO THREE DOT ONE FOUR
  FN num sum DO
    SET sum TO sum LOR ZERO
    IF num SEQ ZERO DO
      RETURN sum
    ELSE DO
      RETURN sum ADD num
    END
  END
END`,
`{
foo: "bar",
160: 3.14,
num(sum) {
 sum = sum || 0
if (num === 0) {
return sum
} else {
return sum + num
}
}
}`)