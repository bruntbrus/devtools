/*
 * Storage
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */
(function main(exports) {
  'use strict'

  const keyPrefix = 'dt:'

  function setValue(key /* string */, value /* any */) {
    value = value && typeof value === 'object' ? JSON.stringify(value) : '' + value
    localStorage.setItem(keyPrefix + key, value)
  }

  function getValue(key /* string */) /* string */ {
    return localStorage.getItem(keyPrefix + key)
  }

  function getKeys() /* string[] */ {
    const keys = []

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(keyPrefix)) {
        keys.push(key.slice(keyPrefix.length))
      }
    })

    return keys
  }

  function removeValue(key /* string */) {
    localStorage.removeItem(keyPrefix + key)
  }

  exports.storage = {
    set: setValue,
    get: getValue,
    keys: getKeys,
    remove: removeValue,
  }
})(window.dt || (window.dt = {}))
