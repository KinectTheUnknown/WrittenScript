# WrittenScript
An interpretted programming language that only uses letters and words

## Basic Types

### Boolean
`TRUE|FALSE`

### String
`STR [...content] END`

### Number
Digits
`[ZERO|ONE|TWO|THREE|FOUR|FIVE|SIX|SEVEN|EIGHT|NINE]`
Number
`...<Digits>`
Integer
`([POS|NEG] )<Number>`
BigInt
`BIG <Integer>`
Float
`<Integer> DOT <Number>`

### Functions
Function Expression
`FN( name)( param1...( param2)) DO ...expression( RETURN( expression)) END`
Anonymous Function
`AFN (param1...( param2)) DO ...expression( RETURN( expression)) END`

### Data Structures
Array
`ARR ...exp END`
Object
`OBJ ...(PROP name exp) END`


## Operators

### Assignment
Variable Declarator `VarDeclarator`
`[GLOBAL|VAR|LET|CONST]`
Assignment
`<VarDeclaration> name TO expression`

### Arithmetic
Add
`a ADD b`
Subtract
`a SUB b`
Multiply
`a MUL b`
Divide
`a DIV b`

### Binary
And
`a AND b`
Or
`a OR b`
XOR
`a XOR b`
Shift Left
`a SHL b`
Shift Right
`a SHR b`
Shift Right Unsigned
`a USHR b`

### Logical
Equality
Strict
`exp SEQ`
And
`exp LAND exp`
Or
`exp LOR exp`

## Statements

### Conditional
If
`IF exp THEN ...exp...( ELSE IF exp THEN ...exp)(ELSE ...exp) END`
Switch
`SWITCH exp...( CASE exp (...exp))( DEFAULT (...exp) END) END`

### Loop
For Loop
`FOR exp exp exp DO ...exp END`
For...of Loop
`FOR <VarDeclarator> OF iterable DO ...exp END`
While Loop
`WHILE exp DO ...exp END`
Do-While Loop
`DO ...exp WHILE exp END`

##Function Call
`<Function> CALL (param1...( param2))`