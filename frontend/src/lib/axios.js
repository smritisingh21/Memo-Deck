import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://memo-deck.vercel.app/api/v1",
});

export default axiosInstance;