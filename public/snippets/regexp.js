/*
 * RegExp
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 */
(function main(exports) {
  'use strict'

  // TODO: Add common patterns
  const patterns = {
    digits: /^[0-9]+$/,
    number: /\d+(\.\d+)?/,
    alpha: /^[a-zA-Z]+$/,
    alphaNum: /^[a-zA-Z0-9]+$/,
    date: /^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/,
    email: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
    password: /^.*(?=.{6,})(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
    url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
    ip: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    htmlTag: /^<([a-z]+)([^<]+)*(?:>(.*)<\/1>|s+\/>)$/,
  }

  function escape(string /* string */) /* string */ {
    return string.replace(/[\\^$().+\-?*[\]{}]/g, '\\$&')
  }

  exports.regexp = {
    patterns,
    escape,
  }
})(window.dt || (window.dt = {}))
