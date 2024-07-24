const ImageHelper = () => {}

/**
 * @description function to get base64 of a file
 * @param {*} file
 * @example
 * 1. ImageHelper.fileToBase64(<file>) returns base64 of a file
 * @returns {base64} data of a file
 */

ImageHelper.fileToBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

/**
 * @description function to convert base64 to file
 * @param {*} base64
 * @param {*} name
 * @example
 * 1. ImageHelper.base64toFile(<base64>, <name>) returns file
 * @returns {file} file
 */

ImageHelper.base64toFile = (base64, name) => {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const extension = mime.split('/')[1]
  const filename = `${name}.${extension}`
  const bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

module.exports = ImageHelper
