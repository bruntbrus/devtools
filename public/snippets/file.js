/*
 * File
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
 * https://developer.mozilla.org/en-US/docs/Web/API/File
 */
(function main(exports) {
  'use strict'

  const readMethodNames = {
    text: 'readAsText',
    url: 'readAsDataURL',
    buffer: 'readAsArrayBuffer',
  }

  const fileInputStyle = [
    'all: initial',
    'display: block',
    'position: fixed',
    'bottom: 0',
    'right: 0',
    'width: 320px',
    'height: auto',
    'z-index: 10000',
    'font: 12pt normal',
    'color: #000',
    'background: #eee',
    'border: 1px solid #aaa',
    'margin: 0',
    'padding: 5px',
  ].join('; ')

  let fileInput = null

  function addFileInput() {
    fileInput = document.createElement('input')

    fileInput.type = 'file'
    fileInput.name = 'dt_file'
    fileInput.multiple = true
    fileInput.style.cssText = fileInputStyle

    document.documentElement.appendChild(fileInput)
    fileInput.focus()
  }

  function removeFileInput() {
    document.documentElement.removeChild(fileInput)

    fileInput = null
  }

  function toggleFileInput() {
    if (fileInput) {
      removeFileInput()
    } else {
      addFileInput()
    }
  }

  function getFile(name /* string? */) /* File? */ {
    if (!fileInput) {
      return null
    }

    if (!name) {
      return fileInput.files.length ? fileInput.files[0] : null
    }

    return Array.from(fileInput.files).find((file) => file.name === name)
  }

  function getAllFiles() /* File[] */ {
    return fileInput ? Array.from(fileInput.files) : []
  }

  async function readFile(file = null /* Blob? | string */, readType = 'text' /* string */) /* string | ArrayBuffer */ {
    const readMethodName = readMethodNames[readType]

    if (!readMethodName) {
      return Promise.reject(new Error('Unkown read type: ' + readType))
    }

    if (!file || typeof file === 'string') {
      file = getFile(file)

      if (!file) {
        return Promise.reject(new Error('File not found'))
      }
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = function onLoad() {
        resolve(reader.result)
      }

      reader.onerror = function onError(err) {
        reject(err)
      }

      reader[readMethodName](file)
    })
  }

  async function requestFileSystem(persistent = false /* boolean */, size = 10 * 1024 * 1024 /* number */) {
    return new Promise((resolve, reject) => {
      const request = window.requestFileSystem || window.webkitRequestFileSystem

      if (!request) {
        reject(new Error('FileSystem API not available'))
        return
      }

      request(persistent ? Window.PERSISTENT : Window.TEMPORARY, size, function onFileSystemLoad(fs /* FileSystem */) {
        resolve(fs)
      }, function onFileSystemError(err /* FileError */) {
        reject(err)
      })
    })
  }

  function download(data /* any */, fileName = 'download.txt' /* string */, type = 'text/plain' /* string */) {
    const blob = new Blob([data], { type })
    const a = document.createElement('a')

    a.href = URL.createObjectURL(blob)
    a.download = fileName

    a.dispatchEvent(new MouseEvent('click'))
  }

  exports.file = {
    toggle: toggleFileInput,
    get: getFile,
    getAll: getAllFiles,
    read: readFile,
    fs: requestFileSystem,
    download,
  }
})(window.dt || (window.dt = {}))
