import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://memo-deck.onrender.com/api/v1",
});



export default axiosInstance;