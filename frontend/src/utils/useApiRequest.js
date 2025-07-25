import axios from "axios";
import { useState } from "react";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      // Redirect to login here
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

const useApiRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const get = async (url) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setIsLoading(false);
    }
  };

  const post = async (url, payload) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(url, payload);
      return res.data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setIsLoading(false);
    }
  };

  const put = async (url, payload) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.put(url, payload);
      return res.data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setIsLoading(false);
    }
  };

  const _delete = async (url, payload) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.delete(url, payload);
      return res.data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setIsLoading(false);
    }
  };

  const api = {
    get,
    post,
    put,
    _delete,
  };

  return { isLoading, get, post, put, _delete, api };
};

export default useApiRequest;
