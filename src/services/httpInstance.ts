import { error } from "console";
import Config from "../config";
import axios from "axios";

const httpInstance = axios.create({
    baseURL: Config.API_URL,
});

httpInstance.interceptors.request.use (
    async (config) => {
        const newConfig = { ...config };
        // newConfig.headers.Authorization = `Bearer ${jwtToken}`;
        // newConfig.headers ["X-Version"] = "1.0.0";
        // newConfig.headers ["X-Signature"] = demoToken;
        return newConfig;
    },
    (error) => {
       return Promise.reject(error);
    }
);

httpInstance.interceptors.response.use(
    (response) => {
     console.log(response);
        return response;
    },
    (error) => {
        // console.log(error);
       return Promise.reject(error);
    }
);  

export default httpInstance;