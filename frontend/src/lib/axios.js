import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4040/api/v1"
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
if (
  token &&
  !config.url.startsWith("/auth/login") &&
  !config.url.startsWith("/auth/signup")
) {
  config.headers.Authorization = `Bearer ${token}`;
}

  return config;
});

export default axiosInstance;