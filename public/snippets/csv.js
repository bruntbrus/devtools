/*
 * CSV
 *
 * https://en.wikipedia.org/wiki/Comma-separated_values
 */
(function main(exports) {
  'use strict'

  function parse(csv /* string */, valueSep = ',' /* string */, rowSep = /\r?\n/ /* string | RegExp */) /* string[][] */ {
    // TODO: Do it right, this only works for simple cases!
    return csv.split(rowSep).map((line) => line.split(valueSep))
  }

  function stringify(rows /* any[][] */, valueSep = ',' /* string */, rowSep = '\n' /* string */) /* string */ {
    return rows.map((values) => values.map(JSON.stringify).join(valueSep)).join(rowSep)
  }

  exports.csv = {
    parse,
    stringify,
  }
})(window.dt || (window.dt = {}))
