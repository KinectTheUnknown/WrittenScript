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

test("Object: Virtuals", shouldParseAs,
`OBJ
  SET foo value DO _foo TO value END
  GET foo DO RETURN _foo END
END`,
`{
set foo(value) {
_foo = value
},
get foo() {
return _foo
}
}`)

test("Object: Mix", shouldParseAs,
`OBJ PROP foo TO STR bar END
  PROP baz TO THREE DOT ONE FOUR
  FN num sum DO
    sum TO sum LOR ZERO
    IF num SEQ ZERO DO
      RETURN sum
    ELSE DO
      RETURN sum ADD num
    END
  END
  SET foo value DO _foo TO value END
  GET foo DO RETURN _foo END
END`,
`{
foo: "bar",
baz: 3.14,
num(sum) {
sum = sum || 0
if (num === 0) {
return sum
} else {
return sum + num
}
},
set foo(value) {
_foo = value
},
get foo() {
return _foo
}
}`)