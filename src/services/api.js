import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Altere se o backend estiver rodando em outro local
});

export default api;
