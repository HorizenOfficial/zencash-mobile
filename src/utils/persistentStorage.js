export const ZENCASH_MOBILE_SAVE_PATH = 'zencash_wallet.json'

export function readFromFile (fileName, onSuccess, onFail) {
  const pathToFile = cordova.file.dataDirectory + fileName
  window.resolveLocalFileSystemURL(
    pathToFile,
    function (fileEntry) {
      fileEntry.file(function (file) {
        var reader = new FileReader()

        reader.onloadend = function (e) {
          onSuccess(this.result)
        }

        reader.readAsText(file)
      }, onFail
      ) 
}, onFail
  )
}

export function writeToFile (fileName, data) {
  data = JSON.stringify(data, 4, '\t')
  window.resolveLocalFileSystemURL(
    cordova.file.dataDirectory,
    function (directoryEntry) {
      directoryEntry.getFile(
        fileName,
        { create: true },
        function (fileEntry) {
          fileEntry.createWriter(function (fileWriter) {
            fileWriter.onwriteend = function (e) {
              // for real-world usage, you might consider passing a success callback
              // alert('Write of file "' + fileName + '"" completed.')
            }

            fileWriter.onerror = function (e) {
              // you could hook this up with our global error handler, or pass in an error callback
              alert('WARNING. YOUR SECRET PHRASE COULD NOT BE SAVED. PRIVATE KEYS SAVING FAILED.')
            }

            var blob = new Blob([data], { type: 'text/plain' })
            fileWriter.write(blob)
          }, errorHandler.bind(null, fileName))
        },
        errorHandler.bind(null, fileName)
      )
    },
    errorHandler.bind(null, fileName)
  )
}

const errorHandler = function (fileName, e) {
  var msg = ''

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'Storage quota exceeded'
      break
    case FileError.NOT_FOUND_ERR:
      msg = 'File not found'
      break
    case FileError.SECURITY_ERR:
      msg = 'Security error'
      break
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'Invalid modification'
      break
    case FileError.INVALID_STATE_ERR:
      msg = 'Invalid state'
      break
    default:
      msg = 'Unknown error'
      break
  }

  alert('Error (' + fileName + '): ' + msg)
}
