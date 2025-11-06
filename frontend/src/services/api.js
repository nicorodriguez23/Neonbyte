import axios from "axios";

// Si la env existe, úsala. Si no, usa /api.
// Pero si estamos en Vercel (dominio vercel.app) y quedó /api, forzamos Render.
const ENV = (import.meta?.env?.VITE_API_BASE_URL || "").trim();
let baseURL = ENV || "/api";

if (typeof window !== "undefined") {
  const host = window.location.hostname;
  const isVercel = host.endsWith(".vercel.app");
  if (isVercel && baseURL === "/api") {
    baseURL = "https://neonbyte.onrender.com/api";
  }
}

console.log("API baseURL =>", baseURL);

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, Promise.reject);

api.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
