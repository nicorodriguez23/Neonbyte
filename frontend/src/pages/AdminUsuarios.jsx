"use client"

import { useState, useEffect } from "react"
import api from "../services/api"
import "../styles/AdminUsuarios.css"

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    fechaNacimiento: "",
    rol: "cliente",
  })
  const [mensaje, setMensaje] = useState("")
  const [editar, setEditar] = useState(null)
  const [usuarioActual, setUsuarioActual] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario")
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setUsuarioActual(parsed)
      if (parsed.rol !== "admin") {
        setMensaje("Acceso denegado. Solo administradores pueden ver esta sección.")
        return
      }
      obtenerUsuarios()
    } else {
      setMensaje("Debe iniciar sesión para acceder.")
    }
  }, [])

  const obtenerUsuarios = () => {
    api
      .get("/usuarios") // ✅ Asegurate que esté montado en el backend como /usuarios
      .then((response) => setUsuarios(response.data))
      .catch((error) => {
        console.error("Error al obtener usuarios:", error)
        setMensaje("No se pudo obtener la lista de usuarios.")
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const camposRequeridos = ["nombre", "email", "password", "fechaNacimiento"]
    for (const campo of camposRequeridos) {
      if (!formData[campo]) {
        setMensaje("Todos los campos son obligatorios.")
        return
      }
    }

    const datos = {
      ...formData,
      fechaNacimiento: new Date(formData.fechaNacimiento).toISOString()
    }

    if (editar) {
      api
        .put(`/usuarios/${editar}`, datos)
        .then((response) => {
          setUsuarios(usuarios.map((u) => (u._id === editar ? response.data : u)))
          setMensaje("Usuario actualizado con éxito.")
          setEditar(null)
        })
        .catch(() => setMensaje("Error al actualizar usuario."))
    } else {
      api
        .post("/usuarios", datos)
        .then((response) => {
          setUsuarios([...usuarios, response.data])
          setMensaje("Usuario creado con éxito.")
        })
        .catch(() => setMensaje("Error al crear usuario."))
    }

    setFormData({
      nombre: "",
      email: "",
      password: "",
      fechaNacimiento: "",
      rol: "cliente",
    })
  }

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      api
        .delete(`/usuarios/${id}`)
        .then(() => {
          setUsuarios(usuarios.filter((u) => u._id !== id))
          setMensaje("Usuario eliminado con éxito.")
        })
        .catch(() => setMensaje("Error al eliminar usuario."))
    }
  }

  const handleEdit = (user) => {
    setFormData({
      nombre: user.nombre,
      email: user.email,
      password: "", // Seguridad: no se muestra la contraseña
      fechaNacimiento: user.fechaNacimiento?.slice(0, 10) || "",
      rol: user.rol || "cliente",
    })
    setEditar(user._id)
  }

  if (!usuarioActual || usuarioActual.rol !== "admin") {
    return (
      <div className="admin-container">
        <p className="toast-mensaje">{mensaje}</p>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <header className="header">
        <h2>Administración de Usuarios</h2>
      </header>

      <section className="formulario">
        <h3>{editar ? "Editar Usuario" : "Agregar Nuevo Usuario"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre Completo*</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Email*</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Contraseña*</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Fecha de Nacimiento*</label>
            <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Rol*</label>
            <select name="rol" value={formData.rol} onChange={handleChange} required>
              <option value="cliente">Cliente</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit">{editar ? "Actualizar Usuario" : "Crear Usuario"}</button>
        </form>
      </section>

      {mensaje && <div className="toast-mensaje">✔ {mensaje}</div>}

      <section className="tabla-usuarios">
        <h3>Usuarios Registrados</h3>
        <table className="table-centered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha de Nacimiento</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.fechaNacimiento?.slice(0, 10)}</td>
                <td>{usuario.rol}</td>
                <td>
                  <button onClick={() => handleEdit(usuario)}>Editar</button>
                  <button onClick={() => handleDelete(usuario._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default AdminUsuarios
