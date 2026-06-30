import axios from "axios";

const api = axios.create({
    baseURL: "https://proact-ai-backend-u03n.onrender.com/api",
    timeout: 30000,
});

export default api;