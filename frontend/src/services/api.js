// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:5000/api"
// });

// export default api;




// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://127.0.0.1:5000/api",
//     timeout: 10000,
// });

// export default api;




import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 60000,
});

export default api;