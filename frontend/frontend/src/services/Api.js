import axios from "axios";
import Constant from "../config/Constant";

const api = axios.create({
  baseURL: Constant.backendApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;