import axios from "axios";

const api = axios.create({
  baseURL: "https://hospital-backend-72gn.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;