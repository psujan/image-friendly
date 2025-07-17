//import React from "react";

import axios from "axios";
const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// sending dynamic token
apiAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const isAuthenticated = localStorage.getItem("token");





export default apiAuth;

export { isAuthenticated };
