// For customize global functions

  export const validateEmail = (email) => {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };
  
  export const imagesToBase64 = async (filesArray) => {
    try {
      const base64Promises = filesArray.map((file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.onload = () => resolve(fileReader.result);
          fileReader.onerror = (error) => {
            reject(new Error("An error occurred while reading the file."));
          };
          fileReader.readAsDataURL(file);
        });
      });
  
      const base64Images = await Promise.all(base64Promises);
      return base64Images[0];
    } catch (error) {
      console.error(error);
      throw new Error("Failed to convert images to Base64.");
    }
  };
  

 export const  convertTime= (timeString) =>{
    // Create a new Date object from the input time string
    const date = new Date(timeString);
  
    // Extract hours and minutes from the Date object
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
  
    // Convert 24-hour format to 12-hour format
    let formattedHours = hours % 12;
    if (formattedHours === 0) {
      formattedHours = 12; // Set 12 PM and 12 AM instead of 0 AM
    }
  
    // Add leading zero to minutes if necessary
    const formattedMinutes = String(minutes).padStart(2, '0');
  
    // Determine whether it's AM or PM
    const meridiem = hours >= 12 ? 'PM' : 'AM';
  
    // Create the formatted time string
    const formattedTime = `${formattedHours}:${formattedMinutes} ${meridiem}`;
  
    return formattedTime;
  }
  

  export const formatDate = (dateString)=> {
    if (!dateString) return ""; // Return an empty string if the input is undefined or empty

    const dateObj = new Date(dateString);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1; // Months are zero-indexed, so we add 1
    const year = dateObj.getUTCFullYear();
  
    // Pad with leading zeros if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  