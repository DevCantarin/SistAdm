import axios from "axios";

 const apiSheets = axios.create({
    baseURL: "https://script.google.com/macros/s/AKfycbyAIdk_iub6yZ_-MQCGbE6lxIiTLb0PA_bj5YY-qLp6hJbQmd_WWmmtnbWgz5I6NKg/exec?"
})

export default apiSheets