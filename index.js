const ohm = require("ohm-js")
const fs = require("fs")
const data = fs.readFileSync("grammer.ohm")
const grammar = ohm.grammar(data)

module.exports = {
  grammar,
  parse(str) {
    return grammar.match(str)
  }
}