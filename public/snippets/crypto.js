/*
 * Crypto
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto
 */
(function main(exports) {
  'use strict'

  async function digest(algorithm /* string */, buffer /* ArrayBuffer | string */) /* string */ {
    if (typeof buffer === 'string') {
      const encoder = new TextEncoder()

      buffer = encoder.encode(buffer)
    }

    return crypto.subtle.digest(algorithm, buffer).then((buffer) => {
      const view = new DataView(buffer)
      const codes = []
      const padding = '00000000'

      for (let i = 0, length = view.byteLength; i < length; i += 4) {
        const value = view.getUint32(i).toString(16)

        codes.push((padding + value).slice(-padding.length))
      }

      return codes.join('')
    })
  }

  exports.crypto = {
    sha1: async function sha1(buffer /* ArrayBuffer | string */) /* string */ {
      return digest('SHA-1', buffer)
    },

    sha256: async function sha256(buffer /* ArrayBuffer | string */) /* string */ {
      return digest('SHA-256', buffer)
    },

    sha384: async function sha384(buffer /* ArrayBuffer | string */) /* string */ {
      return digest('SHA-384', buffer)
    },

    sha512: async function sha512(buffer /* ArrayBuffer | string */) /* string */ {
      return digest('SHA-512', buffer)
    },
  }
})(window.dt || (window.dt = {}))
