import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://memo-deck.onrender.com/",
});



export default axiosInstance;