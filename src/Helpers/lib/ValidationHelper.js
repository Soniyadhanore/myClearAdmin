const ValidationHelper = () => {}

/**
 * @description email validation
 * @param {*} email
 * @returns
 */
ValidationHelper.isEmail = email => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return emailRegex.test(email)
}

/**
 * @description validate Password based on regex pattern
 * @should contain at least 8 characters and at most 20
 *  characters and must contain at least one numeric digit and any string of characters and (@, #, $, *, _,)
 * @param {*} password
 * @returns boolean
 */
ValidationHelper.isPassword = password => {
  const passwordRegex = /^(?=.*\d)(?=.*[@#$*_]).{8,20}$/

  return passwordRegex.test(password)
}

ValidationHelper.isEmpty = value => {
  return value === undefined || value === null || value === ''
}

ValidationHelper.isNumber = value => {
  return !isNaN(value)
}

ValidationHelper.isString = value => {
  return typeof value === 'string'
}

ValidationHelper.isBoolean = value => {
  return typeof value === 'boolean'
}

ValidationHelper.isObject = value => {
  return typeof value === 'object'
}

ValidationHelper.isArray = value => {
  return Array.isArray(value)
}

ValidationHelper.isFunction = value => {
  return typeof value === 'function'
}

ValidationHelper.isDate = value => {
  return value instanceof Date
}

ValidationHelper.isUndefined = value => {
  return typeof value === 'undefined'
}

ValidationHelper.isNullOrUndefined = value => {
  return value === null || value === undefined
}

ValidationHelper.isInteger = value => {
  return Number.isInteger(value)
}

ValidationHelper.isURL = value => {
  const urlRegex = /^(http|https):\/\/[^ "]+$/

  return urlRegex.test(value)
}

ValidationHelper.isAlphanumeric = value => {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/

  return alphanumericRegex.test(value)
}

ValidationHelper.isAlpha = value => {
  const alphaRegex = /^[a-zA-Z]+$/

  return alphaRegex.test(value)
}

ValidationHelper.isNumeric = value => {
  const numericRegex = /^[0-9]+$/

  return numericRegex.test(value)
}

ValidationHelper.isJSON = value => {
  try {
    JSON.parse(value)

    return true
  } catch (e) {
    return false
  }
}

ValidationHelper.isBase64 = value => {
  const base64Regex = /[^A-Za-z0-9+/=]/

  return !base64Regex.test(value)
}

ValidationHelper.isHex = value => {
  const hexRegex = /[0-9A-Fa-f]{6}/

  return hexRegex.test(value)
}

ValidationHelper.isIP = value => {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/

  return ipRegex.test(value)
}

ValidationHelper.isIPv4 = value => {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/

  return ipv4Regex.test(value)
}

ValidationHelper.isIPv6 = value => {
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})$/

  return ipv6Regex.test(value)
}

ValidationHelper.isMAC = value => {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

  return macRegex.test(value)
}

ValidationHelper.isUUID = value => {
  const uuidRegex = /([a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8})/

  return uuidRegex.test(value)
}

ValidationHelper.isISBN = value => {
  const isbnRegex = /(?:\d[ -]*?){13}/

  return isbnRegex.test(value)
}

ValidationHelper.hasEmoji = value => {
  const emojiRegex =
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u

  return emojiRegex.test(value)
}

ValidationHelper.hasWhiteSpace = value => {
  const whitespaceRegex = /\s/

  return whitespaceRegex.test(value)
}

ValidationHelper.isStrongPassword = value => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$*_])[A-Za-z\d@#$*_]{8,20}$/

  return strongPasswordRegex.test(value)
}

module.exports = ValidationHelper
