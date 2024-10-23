import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize toastify in your root component
// toast.configure();

// Create an axios instance with default configuration
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Set the base URL from environment variable
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

// Add a request interceptor if you need to add tokens or modify requests
axiosClient.interceptors.request.use(
  function (config) {
    // You can add authentication token or modify config before request is sent
    // Example: config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Handle request error
    toast.error("Request failed. Please try again.");
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle responses globally
axiosClient.interceptors.response.use(
  function (response) {
    const resData = response.data;

    // Check if the status is 1 (success) or -1 (failure)
    if (resData.status === 1) {
      // toast.success(resData.message || "Request successful!"); // Success toast
      return resData.data; // Return the data on success
    } else if (resData.status === -1) {
      // Create a custom error for failed responses
      toast.error(resData.message || "An error occurred."); // Error toast
      return Promise.reject(new Error(resData.message || "An error occurred"));
    }
  },
  function (error) {
    // Handle other errors (like network errors)
    toast.error(error.message || "Network error. Please try again.");
    return Promise.reject(error);
  }
);

export default axiosClient;
