import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4040/api/v1",
});



export default axiosInstance;