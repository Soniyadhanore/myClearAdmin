import encryptDcrypt from "./encryptDcrypt";

//dataObj = array and value
//name = name
//type = add - delete- remove - get
//addType = single - multiple
//

const addDeleteGetSessionStorage = (
  name,
  dataObj = {},
  type = "add",
  addType = "multiple"
) => {
  if (type === "add") {
    if (addType === "single") {
      let en = encryptDcrypt(
        "en",
        typeof dataObj == "object" ? JSON.stringify(dataObj) : dataObj
      );
      sessionStorage.setItem(name, en);
    } else {
      let getItem = sessionStorage.getItem(name);
      if (getItem !== undefined) {
        let de = encryptDcrypt("de", getItem);
        let parse = JSON.parse(de);
        let a = Array.from(parse);
        a.push(dataObj);
        let t = encryptDcrypt("en", JSON.stringify(a));
        sessionStorage.setItem(name, t);
      } else {
        let en = encryptDcrypt("en", JSON.stringify([dataObj]));
        sessionStorage.setItem(name, en);
      }
    }
  } else if (type === "get") {
    try {
      let g = sessionStorage.getItem(name);
      let d = encryptDcrypt("de", g);
      return d;
    } catch (e) {
      return null;
    }
  } else if (type === "delete") {
    sessionStorage.removeItem(name);
  } else {
    let getItem = sessionStorage.getItem(name);
    if (getItem !== undefined) {
      let de = encryptDcrypt("de", getItem);
      let parse = JSON.parse(de);
      let a = Array.from(parse);
      let l = [];
      a.forEach((obj) => {
        if (dataObj.id !== obj.id) {
          l.push(obj);
        }
      });
      let t = encryptDcrypt("en", JSON.stringify(l));
      sessionStorage.setItem(name, t);
    } else {
        sessionStorage.removeItem(name);
    }
  }
};

export default addDeleteGetSessionStorage;
