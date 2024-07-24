const CryptoJS = require("crypto-js");
const encryptDcrypt = (type = "en", value = "") => {
  let secret = "thr2vCzS7ekgwd4ZnfXYq7TAnVjRILE9odGWUMMfQcRS2t6ym";

  if (type == "en") {
    return CryptoJS.AES.encrypt(value, secret);
  } else {
    let c = CryptoJS.AES.decrypt(value, secret);
    return c.toString(CryptoJS.enc.Utf8);
  }
};
export default encryptDcrypt;
