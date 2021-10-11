/*
 * Load resources
 *
 * https://cdnjs.com
 */
(function main(exports) {
  'use strict'

  const config = {
    cdnBaseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/',
    nameStyle: 'font-weight: bold',
  }

  async function loadScript(src /* string */, globalKey /* string | undefined */) /* any */ {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      const prevValue = globalKey ? window[globalKey] : undefined

      script.src = getUrl(src)
      script.async = true

      script.onload = function onLoad(/* Event */) {
        cleanup()

        let value = null

        if (globalKey) {
          value = window[globalKey]

          if (prevValue) {
            window[globalKey] = prevValue
          } else {
            delete window[globalKey]
          }
        }

        console.log('Script loaded: %c' + getFileName(script.src), config.nameStyle)
        resolve(value)
      }

      script.onerror = function onError(err) {
        cleanup()
        console.warn('Unable to load script: %c' + getFileName(script.src), config.nameStyle)
        reject(err)
      }

      function cleanup() {
        delete script.onload
        delete script.onerror
      }

      document.head.appendChild(script)
    })
  }

  async function loadStyle(href /* string */) /* Object */ {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')

      link.href = getUrl(href)
      link.rel = 'stylesheet'

      link.onload = function onLoad(/* Event */) {
        cleanup()
        console.log('Stylesheet loaded: %c' + getFileName(link.href), config.nameStyle)
        resolve(null)
      }

      link.onerror = function onError(err) {
        cleanup()
        console.warn('Unable to load: %c' + getFileName(link.href), config.nameStyle)
        reject(err)
      }

      function cleanup() {
        delete link.onload
        delete link.onerror
      }

      document.head.appendChild(link)
    })
  }

  function getUrl(src /* string */) { /* string */
    return src.replace(/^!/, config.cdnBaseUrl)
  }

  function getFileName(url /* string */) /* string */ {
    const i = url.lastIndexOf('/')
    return i >= 0 ? url.slice(i + 1) : url
  }

  exports.load = {
    script: loadScript,
    style: loadStyle,
    getUrl,
    getFileName,
  }
})(window.dt || (window.dt = {}))
