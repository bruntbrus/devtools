/*
 * Cookie
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 */
(function main(exports) {
  'use strict'

  const encode = encodeURIComponent
  const decode = decodeURIComponent

  function setCookie(key /* string */, value /* any */, options = {} /* Object */) {
    const {
      path /* string? */,
      domain /* string? */,
      maxAge /* number? */,
      expires /* string | Date? */,
      secure /* boolean? */,
      sameSite, /* string? - "lax" or "strict" */
    } = options

    const parts = [key + '=' + encode('' + value)]

    if (path) {
      // Path must be absolute
      parts.push('path=' + path)
    }

    if (domain) {
      parts.push('domain=' + domain)
    }

    if (maxAge) {
      // Max age in seconds
      parts.push('max-age=' + maxAge)
    }

    if (expires) {
      // UTC date format: DD (month) YYYY HH:MM:SS (time zone)
      parts.push('expires=' + (typeof expires === 'object' ? expires.toUTCString() : expires))
    }

    if (secure) {
      parts.push('secure')
    }

    if (sameSite) {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies
      parts.push('sameSite=' + sameSite)
    }

    document.cookie = parts.join('; ')
  }

  function deleteCookie(key /* string */) {
    // Dawn of time
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }

  function getCookie(key /* string */) /* string | undefined */ {
    return getAllCookies()[key]
  }

  function getAllCookies() /* Object */ {
    const cookies = {}

    if (document.cookie) {
      document.cookie.split(/;\s?/).forEach((cookie) => {
        const [key, value] = cookie.split('=', 2)

        cookies[key] = decode(value)
      })
    }

    return cookies
  }

  exports.cookie = {
    set: setCookie,
    delete: deleteCookie,
    get: getCookie,
    getAll: getAllCookies,
  }
})(window.dt || (window.dt = {}))
