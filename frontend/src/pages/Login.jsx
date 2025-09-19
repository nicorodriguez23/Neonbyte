"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Login.css"
import api from "../services/api"

const Login = ({ setUsuario }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [mensaje, setMensaje] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMensaje("")

    if (!formData.email || !formData.password) {
      setError("Todos los campos son obligatorios")
      return
    }

    try {
      const response = await api.post("/usuarios/login", formData)
      const { token, usuario } = response.data

      let usuarioFinal = usuario
      if (!usuarioFinal && token) {
        const payload = JSON.parse(atob(token.split(".")[1]))
        usuarioFinal = {
          nombre: payload.nombre || "Usuario",
          rol: payload.rol || "cliente",
          _id: payload._id || payload.id,
        }
      }

      if (!usuarioFinal) {
        throw new Error("No se pudo obtener la información del usuario.")
      }

      localStorage.setItem("token", token)
      localStorage.setItem("usuario", JSON.stringify(usuarioFinal))
      setUsuario(usuarioFinal)

      setMensaje(`Bienvenido, ${usuarioFinal.nombre}! 🎮`)
      setTimeout(() => {
        if (usuarioFinal.rol === "admin") {
          navigate("/admin-productos")
        } else {
          navigate("/")
        }
      }, 1500)

    } catch (err) {
      console.error("Error al iniciar sesión:", err)
      setError(err?.response?.data?.mensaje || "Error al iniciar sesión")
    }
  }

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error">{error}</p>}
        {mensaje && <div className="toast-mensaje">{mensaje}</div>}

        <button type="submit">Ingresar</button>
      </form>
    </div>
  )
}

export default Login
