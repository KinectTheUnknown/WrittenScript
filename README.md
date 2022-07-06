Do you ever feel that the extra effort it takes to move your fingers in the correct position just to type a single special character slowed down your development by 100 ms? Me neither, but the idea for this programming language was inspired by a few of my friends who hate typing code, even if it's only 5 characters long.
# WrittenScript
WrittenScript is a programming language that only uses letters and words. The attached code is a transcompiler using OhmJS that converts it to Javascript.

## Basic Types

### Boolean
`TRUE|FALSE`

### String
`STR( [...content]) END`

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
`FN name ...(params, )DO ...((RETURN )? expression) END`

Unnamed Function Expression
`UFN ...(params )DO ...((RETURN ) expression) END` 

Single-line Arrow Function
`AFN ...(params )DO expression END`

Multi-line Arrow Function
`AFN ...(params )DO ...((RETURN )expression )END`

### Data Structures
Array
`ARR ...(expression SEP )END`

Object
`OBJ ...(PROP name TO expression|METHOD name ...param DO (...expression)) END`


## Operators

### Object property access
`foo OF property`

### Assignment
Variable Declarator (`VarDeclarator`)
`[SET|VAR|LET|CONST]`

Assignment
`<VarDeclarator> name TO expression`

### Arithmetic
Add
`a ADD b`

Subtract
`a SUB b`

Multiply
`a MUL b`

Divide
`a DIV b`

Modulo
`a MOD b`

Exponents
`a POW b`

### Binary
Not
`NOT a`

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
#### Equality

Loose
`exp EQ exp`

Strict
`exp SEQ exp`

#### Unequality
Loose
`exp NEQ exp`

Strict
`exp NSEQ exp`

#### Compararison

And
`exp LAND exp`

Or
`exp LOR exp`

Greater Than
`exp GT exp`

...or Equal to
`exp GTE exp`

Less Than
`exp LT exp`

...or Equal to
`exp LTE exp`

## Statements

### Conditional
If
`IF exp THEN ...exp...( ELSE IF exp THEN ...exp)(ELSE ...exp) END`

Switch
`SWITCH exp...( (CASE exp|DEFAULT)|exp) END`

### Loop
For Loop
`FOR exp exp exp DO ...exp END`

For...of Loop
`FOR <VarDeclarator> name OF iterable DO ...exp END`

While Loop
`WHILE exp DO ...exp END`

Do-While Loop
`DO ...exp WHILE exp END`

## Function Call
`<Function> CALL (param1...( param2)) END`

## Terminators

### End of Line
`(EOL)\n|<End_of_File>`

### End of File
`(EOF)$`

## TODO:
Basic types
  - Template Literal?
    - Perhaps a formatted string (like python %s)

  - Binary literal
  - Octal literal
  - Hex literal
  - Classes

Object access:
  - Computed property name (Bracket notation)

Object literal notation
  - Computed property name
  - Setters/Getters

Loops
  - for...in loop
  - for...of loop

Functions:
  - async

Urnary operators:
  - await

