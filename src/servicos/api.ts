import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-main-production-13d6.up.railway.app"
  // baseURL: "exp://192.168.15.12:19000"
})

export default api;