import axios from "axios";


const axiosInstance = axios.create({
  // Ensure the baseURL is ALWAYS an absolute URL to the backend
  baseURL:  import.meta.env.VITE_API_BASE_URL ||"http://localhost:4040/api/v1",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  }
});
// Request interceptor - adds token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// Response interceptor - handles 401 errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // If response is successful, just return it
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);
export default axiosInstance;