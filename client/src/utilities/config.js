const axios = require("axios");

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  /* other custom settings */
});

// module.exports = axiosInstance;
