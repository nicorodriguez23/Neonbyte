import axios from "axios";

const ENV = (import.meta?.env?.VITE_API_BASE_URL || "").trim();
let baseURL = ENV || "https://neonbyte.onrender.com/api";

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
    const status = error?.response?.status;
    const url = error?.config?.url || "";

    // Solo redirigir a login si el 401 viene de rutas de autenticación
    // NO redirigir si viene de crear orden u otras rutas de negocio
    const esRutaAuth = url.includes("/login") || url.includes("/perfil");

    if (status === 401 && esRutaAuth) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;