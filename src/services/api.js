import axios from "axios";
const api = axios.create({
    baseURL: "https://boasorte.teddybackoffice.com.br",
    timeout: 10000, // Tempo limite de 10 segundos
    headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
    },
});
export default api;
