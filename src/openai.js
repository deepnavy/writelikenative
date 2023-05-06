import axios from "axios";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? import.meta.env.VITE_FLASK_APP_BASE_URL_LOCAL
    : import.meta.env.VITE_FLASK_APP_BASE_URL_PROD;
    
console.log(baseUrl);

const createOpenaiInstance = () => {
  return axios.create({
    baseURL: baseUrl + "/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default createOpenaiInstance;
