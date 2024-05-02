import axios from "axios";

const apiViaCep = axios.create({
  baseURL: "https://viacep.com.br/ws/"
  // baseURL: "exp://192.168.15.12:19000"
})

export default apiViaCep;