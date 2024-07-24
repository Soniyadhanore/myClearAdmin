
import globalRequest from "global-modules/globalRequest";
import {API, STORAGE} from "tutorEnum";
import addDeleteGetLocalStorage from "global-modules/addDeleteGetLocalStorage";

const TokenRefresh = () => {
  return new Promise((resolve, reject) => {
    globalRequest("post", API.TUTOR_AUTH.REFRESH_TOKEN, {}, {}, true, true).then((response) => {
      if (response?.status === "SUCCESS") {
        addDeleteGetLocalStorage(
          STORAGE.TOKEN,
          response?.data?.token,
          "add",
          "single"
        );
        resolve(response.data);
      } else {
        resolve(response.data);
      }
    }).catch((err) => {resolve(err);});
  });
};

export default TokenRefresh;