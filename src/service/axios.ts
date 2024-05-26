import axios from "axios";
const localhostBaseUrl = "http://localhost:8080";
const baseURL = "https://backend.tim-space.shop";

const api = axios.create({
  baseURL: localhostBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
