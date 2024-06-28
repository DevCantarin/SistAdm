import axios from "axios";

 const apiDispensas = axios.create({
    baseURL: "https://script.google.com/macros/s/AKfycbyLyLYwfc_PJSh9x3vJcgtCiB2271w2QLd-r55t53XMI3N4zZKGo8MCDIMkoVbxqEI/exec?"
})

export default apiDispensas