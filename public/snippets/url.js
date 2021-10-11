/*
 * URL
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/URL
 */
(function main(exports) {
  'use strict'

  const decode = decodeURIComponent

  function parse(url /* string? */) /* Object */ {
    url = url ? new URL(url) : location.href

    return {
      protocol: url.protocol.slice(0, -1),
      port: url.port ? parseInt(url.port, 10) : 0,
      host: url.hostname,
      path: url.pathname,
      query: url.search ? parseQuery(url.search) : {},
      hash: url.hash ? url.hash.slice(1) : '',
      username: url.username || '',
      password: url.password || '',
    }
  }

  function parseQuery(query = location.search /* string */) /* Object */ {
    const params = {}

    if (query.startsWith('?')) {
      query = query.slice(1)
    }

    if (query) {
      query.split('&').forEach((part) => {
        const [key, value] = part.split('=', 2)

        params[decode(key)] = value !== undefined ? decode(value) : ''
      })
    }

    return params
  }

  exports.url = {
    parse,
    parseQuery,
  }
})(window.dt || (window.dt = {}))
