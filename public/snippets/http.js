/*
 * HTTP
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 */
(function main(exports) {
  'use strict'

  async function doRequest({ method /* string */, url /* string */, contentType /* string */, timeout = 30e3 /* number */, data = null /* Object */ }) /* XMLHttpRequest */ {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.timeout = timeout

      xhr.onload = function onLoad() {
        cleanup()
        resolve(xhr)
      }

      xhr.onerror = function onError() {
        cleanup()
        reject(xhr)
      }

      xhr.onabort = function onAbort() {
        cleanup()
        reject(xhr)
      }

      function cleanup() {
        delete xhr.onload
        delete xhr.onerror
        delete xhr.onabort
      }

      xhr.open(method, url, true)

      if (contentType) {
        xhr.setRequestHeader('Content-type', contentType)
      }

      xhr.send(data)
    })
  }

  async function doGetRequest(url /* string */) /* XMLHttpRequest */ {
    return doRequest({ method: 'GET', url })
  }

  async function doPostRequest(url /* string */, data = null /* Object */) /* XMLHttpRequest */ {
    if (data && typeof data === 'object') {
      const formData = new FormData()

      Object.keys(data).forEach((key) => formData.append(key, data[key]))
      data = formData
    }

    return doRequest({ method: 'POST', url, data })
  }

  exports.http = {
    request: doRequest,
    get: doGetRequest,
    post: doPostRequest,
  }
})(window.dt || (window.dt = {}))
