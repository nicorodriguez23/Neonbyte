// src/utils/auth.js

// Guardar sesión (token y usuario) en localStorage
export const guardarSesion = (token, usuario) => {
  if (token) localStorage.setItem("token", token);
  if (usuario) localStorage.setItem("usuario", JSON.stringify(usuario));
};

// Alias por compatibilidad (muchos ejemplos usan setSession)
export const setSession = (token, usuario) => guardarSesion(token, usuario);

// Cerrar sesión (borrar token y usuario)
export const cerrarSesion = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
};

// Obtener token
export const obtenerToken = () => localStorage.getItem("token");

// Obtener usuario (parseado) o null si no existe
export const obtenerUsuario = () => {
  const u = localStorage.getItem("usuario");
  return u ? JSON.parse(u) : null;
};
