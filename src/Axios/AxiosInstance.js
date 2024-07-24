
import axios from "axios";
import addDeleteGetLocalStorage from "./addDeleteGetLocalStorage";
import { baseUrl_Devlopment, baseUrl_Stage, storageKeys } from "./Enum";
const axiosInstance = axios.create({
    baseURL: baseUrl_Devlopment,
    // timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "my_clean_4d2a8d6b7f9e5c1b3a9e7f",
        'Accept-Language': 'en',
        "x-device-type": "web",
        "authorization": `Bearer ${addDeleteGetLocalStorage(storageKeys.ADMIN_TOKEN, {}, "get", "single")}`,
    },
});
axiosInstance.interceptors.request.use(
    (config) => {
         if (addDeleteGetLocalStorage(storageKeys.ADMIN_TOKEN, {}, "get", "single")) {
           config.headers["Authorization"] = `Bearer ${addDeleteGetLocalStorage(storageKeys.ADMIN_TOKEN, {}, "get", "single")}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
      const { response } = error;
              if (response) {
                switch (response?.status) {
                  case 401:
                    localStorage.clear();
                    window.location.href = "/";
                    break;
                  case 403:
                    // resolve({ status: 'FORBIDDEN', message: "You don't have permission to access this resource" }); 
                    return  response.data 
                    break;
                  case 404:
                    // resolve({ status: 'NOT_FOUND', message: "Resource not found" });
                    return { status: 'NOT_FOUND', message: "Resource not found" };
                    break;
                  case 422:
                  case 400:
                    // resolve(response.data);
                    return response.data;
                  default:
                    // resolve({ status: 'INTERNAL_SERVER_ERROR', message: "Something went wrong" , data: response.data.data });
                    return { status: 'INTERNAL_SERVER_ERROR', message: "Something went wrong" , data: response.data };
                }
              }else{
                return { status: 'INTERNAL_SERVER_ERROR', message: "Something went wrong" , data: response.data };
              }
            // });
    }
);

export default axiosInstance;
