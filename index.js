const ohm = require("ohm-js")
const fs = require("fs");
const data = fs.readFileSync("./grammar.ohm", "utf8");
const grammar = ohm.grammar(data)

const semantics = grammar.createSemantics()
const digits = ["ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"]
const varDeclarations = {
  SET: "",
  VAR: "var",
  LET: "let",
  CONST: "const"
}
const urnaryOperators = {
  POS: "+",
  NEG: "-",
  LNOT: "!",
  typeof: "typeof"
}
const arithmeticOps = {
  ADD: "+",
  SUB: "-",
  MUL: "*",
  DIV: "/",
  MOD: "%",
  POW: "**"
}
const logicalOps = {
  AND: "&&",
  OR: "||"
}
semantics.addOperation("eval", {
  Program(lines, eols, __, ____) {
    const l = lines.eval();

    return l.join(";\n");
  },

  // Statement
  AssignmentDeclareStatement(type, _, target) {
    const t = type.eval();
    const name = target.eval();
    return `${t} ${name}`;
  },
  BlockStatement(doStatement, _, __) {
    const body = doStatement.eval();

    return `{\n${body}\n}`;
  },
  DoBlock(_, __, expressions, ___, ____) {
    return expressions.children.map(expression => expression.eval()).join("\n") 
  },
  /*DoBlockStatement(_, __, expressions, ___, ____) {
    return expressions.children.map(expression => expression.eval()).join("\n") 
  },*/
  DoWhileStatement(doStatement, _, whilePart, __, ___) {
    const body = doStatement.eval();
    const wh = whilePart.eval();

    return `do ${body} ${wh}`;
  },
  IfStatement(ifStmt, elseIfStmts, elseStmt, _, __) {
    let res = ifStmt.eval()
    if (elseIfStmts.children.length)
      res += " " + elseIfStmts.children.map(elseIfStmt => elseIfStmt.eval()).join(" ")

    if (elseStmt.numChildren !== 0)
      res += " " + elseStmt.eval()

    return res
  },
  If(_, __, condition, ___, body) {
    return `if (${condition.eval()}) {\n${body.eval()}\n}`
  },
  ElseIf(_, __, ifStmt) {
    return `else ${ifStmt.eval()}`
  },
  Else(_, __, body) {
    return `else {\n${body.eval()}\n}`
  },
  SwitchStatement(_ ,__, item, ___, body, ____) {
    return `switch (${item.eval()}) ${body.eval()}`;
  },
  SwitchBody(_, __, first, ___, ____, _____, rest, ______, _______, ________) {
    return `{\n${first.eval().concat(...rest.eval()).join("\n")}\n}`;
  },
  SwitchBlocks(item) {
    switch (item.sourceString) {
      case "DEFAULT": return "default:";
      case "BREAK": return "break";
      default: return item.eval();
    }
  },
  CaseBlock(_, __, exp) {
    return `case ${exp.eval()}:`;
  },
  WhileStatement(whilePart, blockStatement) {
    const wh = whilePart.eval();
    const body = blockStatement.eval();

    return `${wh} ${body}`;
  },
  While(_, __, exp) {
    const condition = exp.eval();

    return `while (${condition})`
  },

  // Expression
  AssignmentExp(type, _, name, __, exp) {
    return `${type.eval() + " " || ""}${name.eval()} = ${exp.eval()}`
  },
  AssignmentTargetExp(exp) {
    return exp.eval();
  },
  varType(type) {
    return varDeclarations[type.sourceString]
  },
  BinaryOpExp(operandA, _, operator, __, operandB) {
    return `${operandA.eval()} ${operator.eval()} ${operandB.eval()}`
  },
  arithmeticOp(op) {
    return arithmeticOps[op.sourceString]
  },
  comparisonOp(size,  _, equal) {
    const s = {G: ">", L: "<"}[size.sourceString];
    const eq = equal.numChildren !== 0 ? "=" : "";

    return s + eq
  },
  equalityOp(negate, strict, _) {
    const n = negate.numChildren !== 0 ? "!" : "=";
    const s = strict.numChildren !== 0 ? "=" : "";

    return `${n}${s}=`;
  },
  logicalOp(_, operator) {
    return logicalOps[operator.sourceString]
  },
  FunctionCall(exp, _, __, ___, params, _____) {
    const fn = exp.eval();
    const p = params.eval();

    return `(${fn})(${p})`
  },
  PropertyAccessExp(target, _, __, ___, property) {
    const t = target.eval();
    const p = property.eval();

    return `${t}.${p}`;
  },
  UrnaryOpExp(urnary, _, exp) {
    const u = urnary.eval();
    const e = exp.eval();

    return `${u}(${e})`;
  },
  urnaryOp(operator) {
    return urnaryOperators[operator.eval()]
  },
  /*Literal(literal) {
    return literal.eval();
  },*/
  Array(_, __, expressions, ___) {
    const body = expressions.eval();

    return `[${body}]`;
  },
  boolean(bool) {
    switch(bool.sourceString) {
      case "TRUE": return true;
      case "FALSE": return false;

      default: throw new Error(`Unexpected boolean literal: ${bool.sourceString}`);
    }
  },
  FunctionExp(_, __, name, rest) {
    const n = name.eval();
    const r = rest.eval();

    return `function ${n}${r}`;
  },
  UnnamedFunctionExp(_, __, rest) {
    const r = rest.eval();

    return `function ${r}`;
  },
  ArrowFunctionSingleExp(start, _, __, body, ___, ____) {
    const s = start.eval();
    const b = body.eval();

    return `${s} ${b}`
  },
  ArrowFunctionMultiExp(start, body) {
    const s = start.eval();
    const b = body.eval();

    return `${s} ${b}`
  },
  ArrowFunctionStart(_, __, params) {
    const p = params.eval().join(", ");

    return `(${p}) =>`
  },
  FunctionExpRest(params, blockStatement) {
    const p = params.eval().join(", ");
    const b = blockStatement.eval();

    return `(${p}) ${b}`
  },
  Integer(n) {
    return n.eval().join("")
  },
  BigInt(_, __, integer) {
    const i = integer.eval();
    return  `${i}n`
  },
  Float(integerPart, _, decimalPart) {
    const iPart = integerPart.numChildren != 0 ? integerPart.eval() : "";
    const dPart = decimalPart.eval();

    return `${iPart}.${dPart}`;
  },
  Object(_, __, props, ___) {
    return `{\n${props.eval().join(",\n")}\n}`
  },
  ObjectProp(_, __, key, ___, ____, _____, value) {
    return `${key.eval()}: ${value.eval()}`;
  },
  ObjectMet(_, __, name, rest) {
    const n = name.eval();
    const r = rest.eval();

    return `${n}${r}`;
  },
  propName(chars) {
    return chars.eval().join("");
  },
  string(_, __, str, ___, ____) {
    return '"' + str.children.map(c => c.eval()).join(``).replace(/[\\"]/g, "\\$0") + '"'
  },
  ReturnStatement(_, __, exp) {
    return `return ${exp.eval()}`
  },
  SpacedExpression(exp, _) {
    return exp.eval();
  },
  variableName(name) {
    return name.eval().join(``)
  },
  tDigit(n) {
    return `${digits.indexOf(n.sourceString)}`
  },

  // Misc
  commaSep(_) {
    return ", ";
  },
  eol(_) {
    return ";";
  },
  letter(c) {
    return c.child(0).sourceString
  },
  sep(_, __) {
    throw new Error("Must not eval sep directly");
  },
  Separated(exps, _, sep, lastExp, ___, lastSep, ____) {
    const exp = [];
    let s;

    if (exps.numChildren > 0) {
      exp.push(...exps.eval())
    }
    if (!lastExp.isTerminal()) {
      exp.push(lastExp.eval())
    }

    if (!sep.isTerminal()) {
      s ??= sep.eval();
    }
    if (!lastSep.isTerminal()) {
      s ??= lastSep.eval();
    }

    return exp.join(s ?? "");
  },
  space(space) {
    return space.sourceString
  },
  _terminal() {
    return this.sourceString;
    //return "(?)";
  },
  _iter(...children) {
    return children.map(c => c.eval())
  },
})

/**
 * @param {string} str
 * @param {string} [startingRule]
 * @return {ohm.MatchResult}
 */
function match(str, startingRule) {
  return grammar.match(str, startingRule);
}
/**
 * @param {string} str
 * @param {string} [startingRule]
 * @return {string | null}
 */
function parse(str, startingRule) {
  const m = match(str, startingRule)
  if (m.failed())
    return null;

  return parseMatch(m)
}
/**
 * @param {ohm.MatchResult} match
 * @return {string}
 */
function parseMatch(match) {
  return semantics(match).eval()
}
module.exports = {
  grammar,
  semantics,
  match,
  parse,
  parseMatch,
}