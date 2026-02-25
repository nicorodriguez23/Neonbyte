"use client"

import { useState } from "react"
import "../styles/register.css"
import api from "../services/api"

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    fechaNacimiento: "",
    provincia: "",
    observacion: "",
    rol: "cliente",
  })

  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validarCampos = () => {
    const erroresTemp = {}
    if (!formData.nombre.trim()) erroresTemp.nombre = "El nombre es obligatorio"
    if (!formData.email.trim()) erroresTemp.email = "El correo es obligatorio"
    if (!formData.password.trim()) erroresTemp.password = "La contraseña es obligatoria"
    if (formData.password !== formData.confirmPassword) erroresTemp.confirmPassword = "Las contraseñas no coinciden"
    if (!formData.fechaNacimiento.trim()) erroresTemp.fechaNacimiento = "La fecha de nacimiento es obligatoria"
    if (!formData.provincia.trim()) erroresTemp.provincia = "La provincia o país es obligatorio"
    return erroresTemp
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const erroresValidacion = validarCampos()

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion)
      setMensaje("")
    } else {
      try {
        const datos = {
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          rol: "cliente",
          fechaNacimiento: new Date(formData.fechaNacimiento).toISOString(),
          provincia: formData.provincia,
          observacion: formData.observacion,
        }

        await api.post("/usuarios/register", datos)

        setMensaje("¡Usuario registrado correctamente!")
        setFormData({
          nombre: "",
          email: "",
          password: "",
          confirmPassword: "",
          fechaNacimiento: "",
          provincia: "",
          observacion: "",
          rol: "cliente",
        })
        setErrores({})
      } catch (error) {
        console.error("❌ Error al registrar:", error)
        setMensaje("Hubo un error al registrar el usuario.")
      }
    }
  }

  return (
    <>
      {/* Header uniforme con el resto del sitio */}
      <div className="page-hero">
        <h1>Registro de Usuario</h1>
        <p>Creá tu cuenta y unite a la comunidad NeonByte</p>
      </div>

      <div className="registro-wrapper">
        <div className="registro-box">
          <form onSubmit={handleSubmit} className="form-register" noValidate>

            <div className="input-group">
              <label htmlFor="nombre">Nombre Completo*</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Tu nombre completo" />
              {errores.nombre && <small className="error-text">{errores.nombre}</small>}
            </div>

            <div className="input-group">
              <label htmlFor="email">Correo Electrónico*</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
              {errores.email && <small className="error-text">{errores.email}</small>}
            </div>

            <div className="registro-grid">
              <div className="input-group">
                <label htmlFor="password">Contraseña*</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
                {errores.password && <small className="error-text">{errores.password}</small>}
              </div>

              <div className="input-group">
                <label htmlFor="confirmPassword">Repetir Contraseña*</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
                {errores.confirmPassword && <small className="error-text">{errores.confirmPassword}</small>}
              </div>

              <div className="input-group">
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento*</label>
                <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
                {errores.fechaNacimiento && <small className="error-text">{errores.fechaNacimiento}</small>}
              </div>

              <div className="input-group">
                <label htmlFor="provincia">Provincia o País*</label>
                <input type="text" id="provincia" name="provincia" value={formData.provincia} onChange={handleChange} placeholder="Buenos Aires, Argentina" />
                {errores.provincia && <small className="error-text">{errores.provincia}</small>}
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="observacion">Observación <span className="opcional">(opcional)</span></label>
              <textarea id="observacion" name="observacion" rows={3} value={formData.observacion} onChange={handleChange} placeholder="Algún comentario adicional..." />
            </div>

            <button type="submit">Crear cuenta</button>
          </form>

          {mensaje && (
            <div className={`toast-mensaje ${mensaje.includes("error") ? "error" : ""}`}>
              {mensaje.includes("error") ? "✖" : "✔"} {mensaje}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Registro