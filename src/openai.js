import axios from "axios";

const createOpenaiInstance = (apiKey) => {
  return axios.create({
    baseURL: "https://api.openai.com/v1/chat/completions",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
  });
};

export default createOpenaiInstance;
