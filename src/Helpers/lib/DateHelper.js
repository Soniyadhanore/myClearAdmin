const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const WEEKDAYS_SHORT = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']

const GetDateValue = (date, type) => {
  const dateTime = new Date(date)
  switch (type) {
    // Year
    case 'Y':
      return dateTime.getFullYear()
    case 'y':
      return dateTime.getFullYear().toString().substr(-2)

    // Month
    case 'F':
      return MONTHS[dateTime.getMonth()]
    case 'M':
      return MONTHS_SHORT[dateTime.getMonth()]
    case 'm':
      return dateTime.getMonth() + 1 > 9 ? dateTime.getMonth() + 1 : `0${dateTime.getMonth() + 1}`
    case 'n':
      return dateTime.getMonth()

    // day
    case 'd':
      return dateTime.getDate() > 9 ? dateTime.getDate() : `0${dateTime.getDate()}`
    case 'D':
      return WEEKDAYS_SHORT[dateTime.getDay()]
    case 'j':
      return dateTime.getDate()
    case 'l':
      return WEEKDAYS[dateTime.getDay()]

    // hour
    case 'H':
      return dateTime.getHours() > 9 ? dateTime.getHours() : `0${dateTime.getHours()}`
    case 'h':
      const hour12 = dateTime.getHours() > 12 ? dateTime.getHours() - 12 : dateTime.getHours()

      return hour12 > 9 ? hour12 : `0${hour12}`
    case 'g':
      return dateTime.getHours() > 12 ? dateTime.getHours() : dateTime.getHours() - 12
    case 'G':
      return dateTime.getHours()

    // minutes
    case 'i':
      return dateTime.getMinutes() > 9 ? dateTime.getMinutes() : `0${dateTime.getMinutes()}`

    // seconds
    case 's':
      return dateTime.getSeconds() > 9 ? dateTime.getSeconds() : `0${dateTime.getSeconds()}`

    // meridians
    case 'A':
      return dateTime.getHours() > 12 ? 'PM' : 'AM'
    case 'a':
      return dateTime.getHours() > 12 ? 'pm' : 'am'

    // default
    default:
      return type
  }
}

/**
 * @description DateHelper class to handle date related operations
 *
 * import DateHelper from 'helpers/DateHelper';
 */

const DateHelper = () => {}

/**
 * @description cunction to convert date to any date-time format
 * @param {*} date to be converted to given format
 * @param {*} format to which the date will be converted
 * @example
 * 1. DateHelper.format('2020-01-01', 'Y-m-d') returns `2020-01-01`
 * 2. DateHelper.format('2020-01-01', 'Y-m-d H:i:s') returns `2020-01-01 00:00:00`
 *
 * @available formats:
 * Y: Year (4 digits)
 * y: Year (2 digits)
 * F: Full month name
 * M: Short month name
 * m: Month number (01-12)
 * n: Month number (1-12)
 * d: Day number (01-31)
 * D: Full weekday name
 * j: Day number (1-31)
 * l(small L): Short weekday name
 * H: Hour number (00-23)
 * h: Hour number (01-12)
 * g: Hour number (1-12)
 * G: Hour number (0-23)
 * i: Minute number (00-59)
 * s: Second number (00-59)
 * A: AM/PM
 * a: am/pm
 * @return {string} date in given format
 */

DateHelper.format = (date = new Date(), format = 'y-m-d H:i:s') => {
  const formatSplit = format.split('')
  let returnString = ''
  formatSplit.forEach(element => {
    const dateString = GetDateValue(date, element)
    returnString += dateString
  })

  return returnString
}

/**
 * @description convert time to 12 hour format
 * @param {*} time
 * @example
 * 1. DateHelper.format12hours('09:00') returns `09:00 AM`
 * 2. DateHelper.format12hours('17:00') returns `05:00 PM`
 * @returns {string} time in 12 hour format
 */

DateHelper.format12hours = time => {
  const hours = parseInt(time.split(':')[0], 10)
  const minutes = parseInt(time.split(':')[1], 10)
  const amPm = hours >= 12 ? 'PM' : 'AM'
  let hour = hours % 12
  hour = hour === 0 ? 12 : hour
  const hourStr = hour < 10 ? `0${hour}` : hour
  const minuteStr = minutes < 10 ? `0${minutes}` : minutes

  return `${hourStr}:${minuteStr} ${amPm}`
}

/**
 * @description function to get all hours in a day with {N} minutes interval
 * @param {*} timeDifference minutes interval
 * @example
 * 1. DateHelper.generateHours(10) returns ['00:00', '00:10', '00:20', '00:30', '00:40', '00:50', '01:00', '01:10', '01:20', '01:30', '01:40', ...]
 * 2. DateHelper.generateHours(5) returns ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', ...]
 * @returns {array} array of hours in a day with {N} minutes interval
 */

DateHelper.generateHours = (timeDifference = 10) => {
  const hours = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += timeDifference) {
      const formattedHour = hour.toString().padStart(2, '0')
      const formattedMinute = minute.toString().padStart(2, '0')
      const time = `${formattedHour}:${formattedMinute}`
      hours.push(time)
    }
  }

  return hours
}

/**
 * @description get last N years from current year
 * @param number of years to get
 * @example
 * 1. DateHelper.getLastNYears(10) => [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014]
 * 2. DateHelper.getLastNYears(5) => [2023, 2022, 2021, 2020, 2019]
 * @returns {number[]} - array of last N years
 */

DateHelper.getLastNYears = (num = 10) => {
  const lastN = parseInt(num)
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = 0; i < lastN; i++) {
    years.push(currentYear - i)
  }

  return years
}

/**
 * @description get date range between two dates
 * @param {*} startDate
 * @param {*} endDate
 * @example
 * 1. DateHelper.getDateRange('2020-01-01', '2020-01-05') => [2020-01-01T00:00:00.000Z, 2020-01-02T00:00:00.000Z, 2020-01-03T00:00:00.000Z, 2020-01-04T00:00:00.000Z, 2020-01-05T00:00:00.000Z]
 * 2. DateHelper.getDateRange('2020-01-01', '2020-01-02') => [2020-01-01T00:00:00.000Z, 2020-01-02T00:00:00.000Z]
 * @returns {Date[]} - array of dates between two dates
 */

DateHelper.getDateRange = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const dates = []
  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date))
  }

  return dates
}

/**
 * @description add days to a date
 * @param {*} date
 * @param {*} days
 * @example
 * 1. DateHelper.addDays('2020-01-01', 5) => 2020-01-06T00:00:00.000Z
 * 2. DateHelper.addDays('2020-01-01', 10) => 2020-01-11T00:00:00.000Z
 * @returns {Date} - date after adding days
 */

DateHelper.addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)

  return result
}

/**
 * @description add months to a date
 * @param {*} date
 * @param {*} months
 * @example
 * 1. DateHelper.addMonths('2020-01-01', 5) => 2020-06-01T00:00:00.000Z
 * 2. DateHelper.addMonths('2020-01-01', 10) => 2020-11-01T00:00:00.000Z
 * @returns {Date} - date after adding months
 */

DateHelper.addMonths = (date, months) => {
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)

  return result
}

/**
 * @description add years to a date
 * @param {*} date
 * @param {*} years
 * @example
 * 1. DateHelper.addYears('2020-01-01', 5) => 2025-01-01T00:00:00.000Z
 * 2. DateHelper.addYears('2020-01-01', 10) => 2030-01-01T00:00:00.000Z
 * @returns {Date} - date after adding years
 */

DateHelper.addYears = (date, years) => {
  const result = new Date(date)
  result.setFullYear(result.getFullYear() + years)

  return result
}

DateHelper.addHour = (date, hours) => {
  const result = new Date(date)
  result.setHours(result.getHours() + hours)

  return result 
}

/**
 * @description subtract days from a date
 * @param {*} date
 *
 * @example
 * 1. DateHelper.subtractDays('2020-01-01', 5) => 2019-12-27T00:00:00.000Z
 * 2. DateHelper.subtractDays('2020-01-01', 10) => 2019-12-22T00:00:00.000Z
 * @returns {Date} - date after subtracting days
 */

DateHelper.subtractDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() - days)

  return result
}

/**
 * @description subtract months from a date
 * @param {*} date
 * @param {*} months
 * @example
 * 1. DateHelper.subtractMonths('2020-01-01', 5) => 2019-08-01T00:00:00.000Z
 * 2. DateHelper.subtractMonths('2020-01-01', 10) => 2019-03-01T00:00:00.000Z
 * @returns {Date} - date after subtracting months
 */

DateHelper.subtractMonths = (date, months) => {
  const result = new Date(date)
  result.setMonth(result.getMonth() - months)

  return result
}

/**
 * @description subtract years from a date
 * @param {*} date
 * @param {*} years
 * @example
 * 1. DateHelper.subtractYears('2020-01-01', 5) => 2015-01-01T00:00:00.000Z
 * 2. DateHelper.subtractYears('2020-01-01', 10) => 2010-01-01T00:00:00.000Z
 * @returns {Date} - date after subtracting years
 */

DateHelper.subtractYears = (date, years) => {
  const result = new Date(date)
  result.setFullYear(result.getFullYear() - years)

  return result
}

/**
 * @description get difference between two dates
 * @param {*} date1
 * @param {*} date2
 * @example
 * 1. DateHelper.getDateDifference('2020-01-01', '2020-01-05') => 4
 * 2. DateHelper.getDateDifference('2020-01-01', '2020-01-02') => 1
 * @returns {number} - difference between two dates
 */

DateHelper.getDateDifference = (date1, date2) => {
  const diffTime = Math.abs(new Date(date2) - new Date(date1))
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

DateHelper.getMinutesDifference = (date1, date2) => {
  const diffTime = new Date(date2) - new Date(date1)
  const diffMinutes = Math.ceil(diffTime / (1000 * 60))

  return diffMinutes
}

/**
 * @description check if date1 is before date2
 * @param {*} date1
 * @param {*} date2
 * @example
 * 1. DateHelper.isDateBefore('2020-01-01', '2020-01-05') => true
 * 2. DateHelper.isDateBefore('2020-01-01', '2020-01-02') => true
 * @returns {boolean} - true if date1 is before date2
 */

DateHelper.isDateBefore = (date1, date2) => {
  const diffTime = Math.abs(new Date(date2) - new Date(date1))

  return diffTime > 0
}

/**
 * @description check if date1 is after date2
 * @param {*} date1
 * @param {*} date2
 * @example
 * 1. DateHelper.isDateAfter('2020-01-01', '2020-01-05') => false
 * 2. DateHelper.isDateAfter('2020-01-01', '2020-01-02') => false
 * @returns {boolean} - true if date1 is after date2
 */

DateHelper.isDateAfter = (date1, date2) => {
  const diffTime = Math.abs(new Date(date2) - new Date(date1))

  return diffTime < 0
}

/**
 * @description get time ago from a date
 * @param {*} date
 * @example
 * 1. DateHelper.timeAgo('2020-01-01') => 1 year ago
 * 2. DateHelper.timeAgo('2020-01-02') => 1 year ago
 * @returns {string} - time ago from a date
 */

DateHelper.timeAgo = date => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) {
    return interval + ' years ago'
  }
  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) {
    return interval + ' months ago'
  }
  interval = Math.floor(seconds / 86400)
  if (interval >= 1) {
    return interval + ' days ago'
  }
  interval = Math.floor(seconds / 3600)
  if (interval >= 1) {
    return interval + ' hours ago'
  }
  interval = Math.floor(seconds / 60)
  if (interval >= 1) {
    return interval + ' minutes ago'
  }

  return Math.floor(seconds) + ' seconds ago'
}

module.exports = DateHelper
