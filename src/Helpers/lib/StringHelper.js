const StringHelper = () => {}

/**
 * @description generate random password based on length
 * @param {*} length
 * @returns string
 */

StringHelper.generatePassword = (length = 8, allowNumberAndSpecialChar = false) => {
  let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  charset += allowNumberAndSpecialChar ? '0123456789@!#$%&*_' : ''
  let password = ''
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  return password
}

/**
 * @description generate random UUID
 * @returns string
 * @example 123e4567-e89b-12d3-a456-426614174000
 */

StringHelper.generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8

    return v.toString(16)
  })
}

/**
 * @description generate slug based on text
 * @param {*} text
 * @returns string
 * @example "Hello World" => "hello-world"
 */

StringHelper.generateSlug = text => {
  return text.toLowerCase().replace(/ /g, '-')
}

/**
 * @description generate random string based on length
 * @param {*} length
 * @returns string
 * @ example 10 => "aBcDeFgHiJ"
 */

StringHelper.generateRandomString = (length = 10, allowNumber = false) => {
  let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  charset += allowNumber ? '0123456789' : ''
  let randomString = ''
  for (let i = 0; i < length; i++) {
    randomString += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  return randomString
}

module.exports = StringHelper
