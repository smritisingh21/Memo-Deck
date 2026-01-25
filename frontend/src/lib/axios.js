import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "https://memo-deck.onrender.com/api/v1"
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