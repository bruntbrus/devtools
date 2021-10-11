/*
 * DOM
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
 */
(function main(exports) {
  'use strict'

  const xpathTypes = {
    any: 0,
    number: 1,
    string: 2,
    boolean: 3,
    first: 9,
    all: 7,
  }

  function parseHTML(html /* string */) /* Node[] */ {
    const factory = document.createElement('div')
    const nodes = []

    let node

    factory.innerHTML = html

    while ((node = factory.firstChild)) {
      factory.removeChild(node)
      nodes.push(node)
    }

    return nodes
  }

  function createTextNode(text = '' /* string */) /* TextNode */ {
    return document.createTextNode(text)
  }

  function createElement(tagName = 'div' /* string */, attributes = null /* Object */, text = '' /* string */) /* Element */ {
    const element = document.createElement(tagName)

    if (attributes) {
      Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]))
    }

    if (text) {
      element.textContent = text
    }

    return element
  }

  function createFragment(nodes = null /* Node[] | string */) /* DocumentFragment */ {
    const fragment = document.createDocumentFragment()

    if (nodes) {
      if (typeof nodes === 'string') {
        nodes = parseHTML(nodes)
      }

      nodes.forEach((node) => fragment.appendChild(node))
    }

    return fragment
  }

  function createComment(text = '' /* string */) /* Comment */ {
    return document.createComment(text)
  }

  function querySelector(selector /* string */, root = document /* Element */) /* Element? */ {
    return root.querySelector(selector)
  }

  function querySelectorAll(selector /* string */, root = document /* Element */) /* Element[] */ {
    return Array.from(root.querySelectorAll(selector))
  }

  function evaluateXPath(xpathExp /* string */, root = document /* Node */, type = 0 /* number | string */) /* any */ {
    if (typeof type === 'string') {
      type = xpathTypes[type]
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate
    const result = document.evaluate(xpathExp, root, null, type, null)

    let value
    let node

    // https://developer.mozilla.org/en-US/docs/Web/API/XPathResult
    switch (type || result.resultType) {
      case 1 /* NUMBER */: value = result.numberValue; break
      case 2 /* STRING */: value = result.stringValue; break
      case 3 /* BOOLEAN */: value = result.booleanValue; break

      case 4 /* UNORDERED_NODE_ITERATOR */:
      case 5 /* ORDERED_NODE_ITERATOR */:
        value = []
        while ((node = result.iterateNext())) { value.push(node) }
        break

      case 6 /* UNORDERED_SNAPSHOT_ITERATOR */:
      case 7 /* ORDERED_SNAPSHOT_ITERATOR */:
        value = []
        for (let i = 0; i < result.snapshotLength; i++) { value.push(result.snapshotItem(i)) }
        break

      case 8 /* ANY_UNORDERED_NODE */:
      case 9 /* FIRST_ORDERED_NODE */:
        value = result.singleNodeValue
        break
    }

    return value
  }

  function addListener(target /* EventTarget | string */, eventType /* string */, callback /* function */) {
    resolveElement(target).addEventListener(eventType, callback, false)
  }

  function removeListener(target /* EventTarget | string */, eventType /* string */, callback /* function */) {
    resolveElement(target).removeEventListener(eventType, callback, false)
  }

  function triggerEvent(target /* EventTarget | string */, event /* Event */) {
    resolveElement(target).dispatchEvent(event)
  }

  function resolveElement(element /* any */) /* any */ {
    return typeof element === 'string' ? document.querySelector(element) : element
  }

  exports.dom = {
    parse: parseHTML,
    text: createTextNode,
    element: createElement,
    fragment: createFragment,
    comment: createComment,
    query: querySelector,
    queryAll: querySelectorAll,
    xpath: evaluateXPath,
    on: addListener,
    off: removeListener,
    trigger: triggerEvent,
  }
})(window.dt || (window.dt = {}))
