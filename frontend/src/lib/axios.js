import axios from "axios";
const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
  withCredentials: true, //send cookies to server
});
// In your axios config (lib/axios.js)

export default axiosInstance;
