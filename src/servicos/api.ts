import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-main-production-13d6.up.railway.app"
})

export default api;