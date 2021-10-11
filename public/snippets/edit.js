/*
 * Edit text
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement
 */
(function main(exports) {
  'use strict'

  const config = {
    width: '20em',
    height: '10em',
    minWidth: '10em',
    minHeight: '5em',
    maxWidth: '100%',
    maxHeight: '100%',
    maxLength: 1024 * 1024, // 1 MB
  }

  const textAreaStyle = [
    'all: initial',
    'box-sizing: border-box',
    'display: block',
    'z-index: 10000',
    'position: fixed',
    'bottom: 0',
    'right: 0',
    'min-width: ' + config.minWidth,
    'min-height: ' + config.minHeight,
    'max-width: ' + config.maxWidth,
    'max-height: ' + config.maxHeight,
    'font: 14px monospace',
    'color: #000',
    'background: rgba(255, 255, 255, 0.95)',
    'border: 1px solid #aaa',
    'margin: 0',
    'padding: 3px',
  ].join('; ')

  let textArea = null

  const state = {
    text: '',
    wrap: false,
    width: config.width,
    height: config.height,
  }

  function addTextArea() {
    textArea = document.createElement('textarea')

    textArea.name = 'dt_edit'
    textArea.value = state.text
    textArea.maxLength = config.maxLength
    textArea.placeholder = 'Edit'
    textArea.onkeydown = onTextAreaKeyDown
    textArea.onchange = onTextAreaChange
    textArea.style.cssText = textAreaStyle

    setStyle({
      whiteSpace: state.wrap ? 'normal' : 'pre',
      width: state.width,
      height: state.height,
    })

    document.documentElement.appendChild(textArea)
    textArea.focus()
  }

  function removeTextArea() {
    state.text = textArea.value

    document.documentElement.removeChild(textArea)

    delete textArea.onkeydown
    delete textArea.onchange

    textArea = null
  }

  function toggleTextArea() {
    if (textArea) {
      removeTextArea()
    } else {
      addTextArea()
    }
  }

  function resizeTextArea(width = config.width /* number | string */, height = config.height /* number | string */) {
    const style = {}

    if (width) {
      state.width = width
      style.width = typeof width === 'number' ? width + 'px' : width
    }

    if (height) {
      state.height = height
      style.height = typeof height === 'number' ? height + 'px' : height
    }

    setStyle(style)
  }

  function minimizeTextArea() {
    resizeTextArea(config.minWidth, config.minHeight)
  }

  function maximizeTextArea() {
    resizeTextArea(config.maxWidth, config.maxHeight)
  }

  function onTextAreaKeyDown(event /* KeyboardEvent */) {
    if (event.keyCode === 27 /* escape key */) {
      removeTextArea()
      event.preventDefault()
    }
  }

  function onTextAreaChange(/* Event */) {
    state.text = textArea.value
  }

  function setStyle(props /* Object */) {
    if (textArea) {
      Object.keys(props).forEach((key) => (textArea.style[key] = '' + props[key]))
    }
  }

  exports.edit = {
    toggle: toggleTextArea,
    resize: resizeTextArea,
    min: minimizeTextArea,
    max: maximizeTextArea,

    set text(value /* any */) {
      value = '' + value
      state.text = value

      if (textArea) {
        textArea.value = value
      }
    },

    get text() /* string */ {
      if (textArea) {
        state.text = textArea.value
      }

      return state.text
    },

    get length() /* number */ {
      return textArea ? textArea.textLength : 0
    },

    set wrap(value /* boolean */) {
      state.wrap = value
      setStyle({ whiteSpace: value ? 'normal' : 'pre' })
    },

    get wrap() /* boolean */ {
      return state.wrap
    },

    set width(value /* number | string */) {
      resizeTextArea(value, 0)
    },

    get width() /* number | string */ {
      return state.width
    },

    set height(value /* number | string */) {
      resizeTextArea(0, value)
    },

    get height() /* number | string */ {
      return state.height
    },
  }
})(window.dt || (window.dt = {}))
