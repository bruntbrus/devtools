/*
 * UTF-8
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
 */
(function main(exports) {
  'use strict'

  function encode(string /* string */) /* Uint8Array */ {
    const encoder = new TextEncoder()

    return encoder.encode(string)
  }

  function decode(bytes /* Uint8Array */) /* string */ {
    const decoder = new TextDecoder()

    return decoder.decode(bytes)
  }

  exports.utf8 = {
    encode,
    decode,
  }
})(window.dt || (window.dt = {}))
