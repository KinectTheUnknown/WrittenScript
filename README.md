Do you ever feel that the extra effort it takes to move your fingers in the correct position just to type a single special character slowed down your development by 100 ms? Me neither, but the idea for this programming language was inspired by a few of my friends who hate typing code, even if it's only 5 characters long.
# WrittenScript
WrittenScript is a programming language that only uses letters and words. The attached code is a transcompiler using OhmJS that converts it to Javascript.

## Basic Types

### Boolean
`TRUE|FALSE`

### String
`STR (...content )END`

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
Function Expression `FunctionExp`
`FN name ...(params )DO ...((RETURN )? expression )END`

Unnamed Function Expression
`UFN ...(params )DO ...((RETURN ) expression )END` 

Single-line Arrow Function
`AFN ...(params )DO expression END`

Multi-line Arrow Function
`AFN ...(params )DO ...((RETURN )expression )END`

### Data Structures
Array
`ARR ...(expression SEP )END`

Object
`OBJ ...([PROP name TO expression|<FunctionExp>|<Getter>|<Setter>] )END`

Getter
`GET name DO ...((RETURN )expression )END`

Setter
`SET name param DO ...((RETURN )expression )END`

Class
`CLASS name DO ...([(STATIC )<FunctionExp>|<Getter>|<Setter>] )END`

## Operators

### Object property access
`foo OF property`

### Assignment
Variable Declarator (`VarDeclarator`)
`VAR|LET|CONST`

Assignment
`(<VarDeclarator> )name TO expression`

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

Negate
`LNOT a`

Loose
`a EQ b`

Strict
`a SEQ b`

#### Unequality
Loose
`a NEQ a`

Strict
`a NSEQ b`

#### Compararison

And
`a LAND b`

Or
`a LOR b`

Greater Than
`a GT b`

...or Equal to
`a GTE b`

Less Than
`a LT b`

...or Equal to
`a LTE b`

## Statements

### Conditional
If
`IF condition THEN ...(statement )...(ELSE IF condition THEN ...statement)(ELSE ...statement)END`

Switch
`SWITCH exp...(((CASE exp|DEFAULT)|statement) )END`

### Loop
For Loop
`FOR initialLoopExp condition endIterationExp DO ...statement END`

For...of Loop
`FOR <VarDeclarator> name OF iterable DO ...statement END`

For...in Loop
`FOR <VarDeclarator> name IN iterable DO ...statement END`

While Loop
`WHILE condition DO ...statement END`

Do-While Loop
`DO ...statement WHILE condition END`

## Function Call
`exp CALL (param1 ...(paramN ))END`

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

Flow control:
  - label
  - break
  - continue

Functions:
  - async
  - generator

Urnary operators:
  - await

Miscellaneous
  - Automatic EOL insertion