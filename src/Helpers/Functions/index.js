// import moment from "moment/moment";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * @description - get last 10 years from current year
 * @returns {number[]} - array of last 10 years
 * @example - getLastTenYears() => [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]
 */
export const getLastTenYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 10; i++) {
    years.push(currentYear - i);
  }
  return years;
};

/**
 * @description - This function is used to display price in the format of 1,000.00
 * @param {number} price - Price to be formatted
 * @returns {string} - Formatted price
 * @example - formatPrice(1000) => 1,000.00
 * @example - formatPrice(1000.5) => 1,000.50
 */
export const formatPrice = (price) => {
  return price ? price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") : "-";
};

/**
 * @description convert time to 12 hour format
 * @param {*} time - time in 24 hour format
 * @returns string - time in 12 hour format
 */
export const convertTimeTo12Hour = (time) => {
  // Check if the input time is a valid string in the format "HH:mm"
  if (!/^\d{2}:\d{2}$/.test(time)) {
    return "Invalid time format";
  }

  const hours = parseInt(time.split(":")[0], 10);
  const minutes = parseInt(time.split(":")[1], 10);

  // Check if hours and minutes are valid
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return "Invalid time values";
  }

  const am_pm = hours >= 12 ? "PM" : "AM";
  let hour = hours % 12;
  hour = hour === 0 ? 12 : hour;
  const hourStr = hour < 10 ? `0${hour}` : hour;
  const minuteStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hourStr}:${minuteStr} ${am_pm}`;
};


/**
 * @description validate Password based on regex pattern
 * @should contain at least 8 characters and at most 20
 *  characters and must contain at least one numeric digit and any string of characters and (@, #, $, *, _,)
 * @param {*} password - password string
 * @returns boolean - true if password is valid else false
 */
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9@#$*_]+){8,20}$/;
  return passwordRegex.test(password);
};

/**
 * @description function to get all hours in a day with 10 minutes interval
 * @param {*} timeDifference - time difference
 * @returns
 */
export const generateHours = (timeDifference = 10) => {
  const hours = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += timeDifference) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      const time = `${formattedHour}:${formattedMinute}`;
      hours.push(time);
    }
  }
  hours.push(`23:59`);
  return hours;
};

/**
 * @description function to get all hours in a day with 30 minutes interval between start and end time
 * @param {*} start
 * @param {*} end
 * @returns
 */
export const getHoursBetween = (start, end) => {
  const hours = [];
  const startHour = parseInt(start.split(":")[0], 10);
  const startMinute = parseInt(start.split(":")[1], 10);
  const endHour = parseInt(end.split(":")[0], 10);
  const endMinute = parseInt(end.split(":")[1], 10);
  for (let i = startHour; i <= endHour; i++) {
    for (let j = 0; j < 2; j++) {
      const hour = i < 10 ? `0${i}` : i;
      const minute = j === 0 ? "00" : "30";
      if (i === startHour && j === 0 && startMinute === 30) {
        continue;
      }
      if (i === endHour && j === 1 && endMinute === 0) {
        continue;
      }
      hours.push(`${hour}:${minute}`);
    }
  }
  return hours;
};

/**
 * @description function to get all hours in a day with 30 minutes interval between start and end time
 * @param {*} start
 * @param {*} end
 * @returns
 */
export const getHoursBetweenGreater = (start, end, time) => {
  const hours = [];
  const startHour = parseInt(start.split(":")[0], 10);
  const startMinute = parseInt(start.split(":")[1], 10);
  const endHour = parseInt(end.split(":")[0], 10);
  const endMinute = parseInt(end.split(":")[1], 10);
  for (let i = startHour; i <= endHour; i++) {
    for (let j = 0; j < 2; j++) {
      const hour = i < 10 ? `0${i}` : i;
      const minute = j === 0 ? "00" : "30";
      if (i === startHour && j === 0 && startMinute === 30) {
        continue;
      }
      if (i === endHour && j === 1 && endMinute === 0) {
        continue;
      }
      hours.push(`${hour}:${minute}`);
    }
  }

  return hours.filter(
    (val) =>
      parseInt(val.split(":").join("")) > parseInt(time.split(":").join(""))
  );
};

export const getHoursBetween10minsGreater = (start, end, time) => {
  const hours = [];
  const startHour = parseInt(start.split(":")[0], 10);
  const startMinute = parseInt(start.split(":")[1], 10);
  const endHour = parseInt(end.split(":")[0], 10);
  const endMinute = parseInt(end.split(":")[1], 10);

  for (let i = startHour; i <= endHour; i++) {
    for (let j = 0; j < 6; j++) { // Iterate in 10-minute intervals (6 intervals per hour)
      const hour = i < 10 ? `0${i}` : i;
      const minute = j * 10;

      if (i === startHour && minute < startMinute) {
        continue;
      }

      if (i === endHour && minute > endMinute) {
        continue;
      }

      const formattedTime = `${hour}:${minute < 10 ? "0" + minute : minute}`;

      if (
        parseInt(formattedTime.split(":").join("")) >
        parseInt(time.split(":").join(""))
      ) {
        hours.push(formattedTime);
      }
    }
  }

  return hours;
};

/**
 * @description function to arrange days in a week sunday to saturday
 * @returns
 */

export const arrangeDaysInWeek = (temp) => {
  let temp1 = [];
  temp.forEach((val, ind) => {
    if (val?.day === "sunday") {
      temp1[0] = val;
    } else if (val?.day === "monday") {
      temp1[1] = val;
    } else if (val?.day === "tuesday") {
      temp1[2] = val;
    } else if (val?.day === "wednesday") {
      temp1[3] = val;
    } else if (val?.day === "thursday") {
      temp1[4] = val;
    } else if (val?.day === "friday") {
      temp1[5] = val;
    } else if (val?.day === "saturday") {
      temp1[6] = val;
    }
  });
  return temp1;
};

/**
 * @description Date And Time From Timestamp
 * @param {*} timestamp
 * @returns
 */
export const getDateAndTimeFromTimestamp = (timestamp) => {
  const dateTime = new Date(timestamp);
  const day =
    dateTime.getDate() > 9 ? dateTime.getDate() : `0${dateTime.getDate()}`;
  const month =
    dateTime.getMonth() + 1 > 9
      ? dateTime.getMonth() + 1
      : `0${dateTime.getMonth() + 1}`;
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  let hour = hours;
  let meridian = "AM";
  if (hours > 12) {
    hour = hours - 12;
    meridian = "PM";
  }
  return `${day}/${month}/${dateTime.getFullYear()} | ${
    hour > 9 ? hour : "0" + hour
  }:${minutes > 9 ? minutes : "0" + minutes} ${meridian}`;
};

/**
 * @description Date From Timestamp or Date
 * @param {*} timestamp or date
 * @returns date in dd/mm/yyyy format
 */
export const getDateFromTimestamp = (timestamp) => {

  // return moment(timestamp).format("YYYY-MM-DD");

  // const dateTime = new Date(timestamp);
  // const day =
  //   dateTime.getDate() > 9 ? dateTime.getDate() : `0${dateTime.getDate()}`;
  // const month =
  //   dateTime.getMonth() + 1 > 9
  //     ? dateTime.getMonth() + 1
  //     : `0${dateTime.getMonth() + 1}`;
  // return `${day}/${month}/${dateTime.getFullYear()}`;
};

/**
 * @description Date From Timestamp or Date
 * @param {*} timestamp or date
 * @returns date in dd/mm/yyyy format
 */
export const getDateForDatabase = (timestamp) => {
  const dateTime = new Date(timestamp);
  const day =
    dateTime.getDate() > 9 ? dateTime.getDate() : `0${dateTime.getDate()}`;
  const month =
    dateTime.getMonth() + 1 > 9
      ? dateTime.getMonth() + 1
      : `0${dateTime.getMonth() + 1}`;
  return `${dateTime.getFullYear()}-${month}-${day}`;
};

/**
 * @description Date From Timestamp or Date
 * @param {*} timestamp or date
 * @returns date in dd/mmm/yyyy format
 */
export const getDate = (timestamp) => {
  const dateTime = new Date(timestamp);
  const day =
    dateTime.getDate() > 9 ? dateTime.getDate() : `0${dateTime.getDate()}`;
  const month = MONTHS[dateTime.getMonth()];
  return `${day} ${month} ${dateTime.getFullYear()}`;
};

export function getMinMaxTimeFromArray(timeArray) {
  if (!Array.isArray(timeArray) || timeArray.length === 0) {
    return null; // Return null for invalid input
  }
  const dateObjects = timeArray.map(
    (timeString) => new Date(`1970-01-01 ${timeString}`)
  );
  const minDate = new Date(Math.min.apply(null, dateObjects));
  const maxDate = new Date(Math.max.apply(null, dateObjects));
  const formatTime = (date) => date.toTimeString().slice(0, 5);
  return {
    minTime: formatTime(minDate),
    maxTime: formatTime(maxDate),
  };
}

/**
 * @description function to get create slug combining first name and last name and converting to lowercase and replacing space with -
 * @param {*} firstName
 * @param {*} lastName
 * @returns
 */
export const createSlug = (firstName, lastName) => {
  return `${firstName}-${lastName}`.toLowerCase().replace(/\s/g, "-");
};

export function getColorClass(status) {
  const lowercaseStatus = status?.toLowerCase(); 
  let color = "";
  switch (lowercaseStatus) {
    case "to be confirmed":
      color = "gray_600";
      break;
    case "confirmed":
      color = "orange_300";
      break;
    case "finished":
      color = "teal_500";
      break;
    case "cancelled":
      color = "red_900";
      break;
    default:
      color = ""; // Default class or no class if status is not recognized.
  }
  return color;
}



export function addOneHour(time) {
  if (!time) return null; // Handle the case where sessions?.bookingTime is undefined or null

  const [hours, minutes] = time.split(':').map(Number);

  // Add 1 hour to the time, and handle rollover to the next day if needed
  const newHours = (hours + 1) % 24;
  
  // Format the new time as HH:MM
  const newTime = `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
  return newTime;
}

export function add30minutes (time) {
  if (!time) return null; // Handle the case where sessions?.bookingTime is undefined or null

  const [hours, minutes] = time.split(':').map(Number);

  // Add 1 hour to the time, and handle rollover to the next day if needed
  const newMinutes = (minutes + 30) % 60;
  const newHours = hours + Math.floor((minutes + 30) / 60);
  
  // Format the new time as HH:MM
  const newTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
  
  return newTime;
}

export function add10minutes(time) {
  if (!time) return null; // Handle the case where time is undefined or null

  const [hours, minutes] = time.split(':').map(Number);

  // Add 10 minutes to the time, and handle rollover to the next hour if needed
  const newMinutes = (minutes + 10) % 60;
  const newHours = hours + Math.floor((minutes + 10) / 60);

  // Handle rollover to the next day if needed
  const finalHours = newHours % 24;

  // Format the new time as HH:MM
  const newTime = `${finalHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;

  return newTime;
}

export const replaceBackSlashNToBr = (str) => {
  return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
} 

/**
 * @description function to split string into substring of given length
 * @param {*} str
 * @param {*} len
 * @returns
 */

export const splitString = (str, len=4) => {
  const size = Math.ceil(str.length / len);
  const r = Array(size)
    .fill()
    .map((_, index) => str.substr(index * len, len));
  return r.join(" ");
};


export const isAlphanumeric = (str) => {
  let hasLetter = false, hasNumber = false;

  for (let i = 0; i < str?.length; i++) {
    if (/^[a-zA-Z]$/.test(str[i])) {
      hasLetter = true;
    }

    if (/^[0-9]$/.test(str[i])) {
      hasNumber = true;
    }

    // If both conditions are met, no need to continue checking
    if (hasLetter && hasNumber) {
      break;
    }
  }

  return hasLetter && hasNumber;
};

export const removeEmoticons = (text) => {
  const emoticonPattern = /[\u00a9\u00ae\u00af\u00e0-\u00ff]/g;

  return emoticonPattern.test(text);
};

export const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  const d = today.getDate() - birthDate.getDate();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const reduce_image_file_size = async(base64Str, MAX_WIDTH = 850, MAX_HEIGHT = 850)=> {
  let resized_base64 = await new Promise((resolve) => {
      let img = new Image()
      img.src = base64Str
      img.onload = () => {
          let canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height
          if (width > height) {
              if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width
                  width = MAX_WIDTH
              }
          } else {
              if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height
                  height = MAX_HEIGHT
              }
          }
          canvas.width = width
          canvas.height = height
          let ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
          resolve(canvas.toDataURL()) // this will return base64 image results after resize
      }
  });
  return resized_base64;
}

export const changeTimezoneUK = (date, timezone) => {
  return new Date(date.toLocaleString("en-GB", {timeZone: timezone}));
}

export const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(blob);
  });
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};


export const getStatusColor =(status)=> {
  switch (status) {
    case 'open':
      return 'bg-[#ffa5004f] text-black';
    case 'action_taken':
      return 'bg-[#FDFDD1] text-black';
    case 'resolved':
      return 'bg-[#90ee904a] text-black';
    default:
      return 'bg-[#fdfdd1] text-black';
  }
}

export const strFormat = (inputStr, type) => {
  try {
      let all = type.split('|');
      if (all.includes('length')) {
          inputStr = inputStr.trim();
          if (inputStr) {
              return inputStr.length;
          }
          return 0;
      }
      if (all.includes('trim')) {
          inputStr = inputStr.trim();
      }
      if (all.includes('number')) {
          inputStr = inputStr.replace(/[^0-9]/g, '');
      }
      if (all.includes('text')) {
          inputStr = inputStr.replace(/\d/g, ''); // This regex replaces all digits (numbers) with an empty string.
      }
      if (all.includes('float') && inputStr) {
          inputStr = inputStr.replace(/[^0-9.]/g, '');
          if (inputStr) {
              const nparts = inputStr.split('.');
              if (nparts.length > 2) {
                  inputStr = nparts[0] + '.' + nparts.slice(1).join('');
              }
              const parts = inputStr ? inputStr.split('.') : [];
              if (parts.length != 0) {
                  if (parts.length === 2 && parts[1].length > 2) {
                      inputStr = parts[0] + '.' + parts[1].substring(0, 2);
                  }
              }
          }
      }

      for (const formatter of all) {
          const [command, ...args] = formatter.split(':');
          switch (command) {
              case 'max':
                  const maxLength = parseInt(args[0]);
                  if (inputStr.length > maxLength) {
                      inputStr = inputStr.slice(0, maxLength);
                  }
                  break;
              case 'max-value':
                  const maxValue = parseInt(args[0]);
                  if (inputStr) {
                      if (maxValue < inputStr) {
                          inputStr = maxValue;
                      }
                  }
                  break;
              default:
                  break;
          }
      }
      inputStr = inputStr ? inputStr.replace(/^\s+/, '') : '';
  } catch (e) {

  }
  return inputStr;
};