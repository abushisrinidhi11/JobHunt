import axios from "axios";

console.log("Creating Axios Instance");

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

console.log("Axios Instance Created");

export default api;