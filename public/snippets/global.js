/*
 * Global (window)
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Window
 */
(function main(exports) {
  'use strict'

  let defaultKeys = null

  function getDefaultKeys() /* string[] */ {
    if (!defaultKeys) {
      const iframe = document.createElement('iframe')

      iframe.style.display = 'none'
      document.documentElement.appendChild(iframe)

      defaultKeys = []

      for (const key in iframe.contentWindow) {
        defaultKeys.push(key)
      }

      document.documentElement.removeChild(iframe)
    }

    return defaultKeys
  }

  function getNewGlobals() /* Object */ {
    const defaultKeys = getDefaultKeys()
    const globals = {}

    for (const key in window) {
      if (defaultKeys.indexOf(key) < 0) {
        globals[key] = window[key]
      }
    }

    return globals
  }

  exports.global = {
    getDefaultKeys,
    getNewGlobals,
  }
})(window.dt || (window.dt = {}))
