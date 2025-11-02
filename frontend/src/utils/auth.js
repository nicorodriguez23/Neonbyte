export const guardarSesion = (token, usuario) => {
  if (token) localStorage.setItem("token", token);
  if (usuario) localStorage.setItem("usuario", JSON.stringify(usuario));
};

export const setSession = (token, usuario) => guardarSesion(token, usuario);

export const cerrarSesion = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
};

export const obtenerToken = () => localStorage.getItem("token");

export const obtenerUsuario = () => {
  const u = localStorage.getItem("usuario");
  return u ? JSON.parse(u) : null;
};
