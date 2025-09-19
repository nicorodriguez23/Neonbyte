export const guardarSesion = (token, usuario) => {
  localStorage.setItem("token", token)
  localStorage.setItem("usuario", JSON.stringify(usuario))
}

export const cerrarSesion = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("usuario")
}

export const obtenerToken = () => localStorage.getItem("token")
export const obtenerUsuario = () => JSON.parse(localStorage.getItem("usuario"))
