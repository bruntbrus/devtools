/*
 * Utilities
 */
(function main(exports) {
  'use strict'

  const hasOwnProperty = Object.prototype.hasOwnProperty

  function clone(value /* any */) /* any */ {
    if (!value || typeof value !== 'object') {
      return value
    }

    if (Array.isArray(value)) {
      return value.map(clone)
    }

    const object = Object.create(Object.getPrototypeOf(value))

    for (const key in value) {
      if (hasOwnProperty.call(value, key)) {
        object[key] = clone(value[key])
      }
    }

    return object
  }

  async function callAsync(func /* function */, ...args /* any[] */) /* function */ {
    return new Promise((resolve, reject) => {
      func(...args, resolve, reject)
    })
  }

  exports.utils = {
    clone,
    callAsync,
  }
})(window.dt || (window.dt = {}))
