import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/adminUsuarios.css";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    fechaNacimiento: "",
    rol: "cliente",
  });
  const [mensaje, setMensaje] = useState("");
  const [editar, setEditar] = useState(null);
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (!storedUser) {
      setMensaje("Debe iniciar sesión para acceder.");
      return;
    }
    const parsed = JSON.parse(storedUser);
    setUsuarioActual(parsed);
    if (parsed.rol !== "admin") {
      setMensaje("Acceso denegado. Solo administradores pueden ver esta sección.");
      return;
    }
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = () => {
    api
      .get("/usuarios")
      .then((res) => setUsuarios(res.data))
      .catch(() => setMensaje("Error al obtener usuarios."));
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      fechaNacimiento: formData.fechaNacimiento
        ? new Date(formData.fechaNacimiento).toISOString()
        : "",
    };

    const req = editar
      ? api.put(`/usuarios/${editar}`, payload)
      : api.post("/usuarios", payload);

    req
      .then((res) => {
        if (editar) {
          setUsuarios((u) => u.map((x) => (x._id === editar ? res.data : x)));
          setMensaje("Usuario actualizado con éxito.");
          setEditar(null);
        } else {
          setUsuarios((u) => [...u, res.data]);
          setMensaje("Usuario creado con éxito.");
        }
        setFormData({
          nombre: "",
          email: "",
          password: "",
          fechaNacimiento: "",
          rol: "cliente",
        });
      })
      .catch(() => setMensaje("Error al guardar usuario."));
  };

  const handleEdit = (user) => {
    setFormData({
      nombre: user.nombre || "",
      email: user.email || "",
      password: "",
      fechaNacimiento: user.fechaNacimiento ? user.fechaNacimiento.slice(0, 10) : "",
      rol: user.rol || "cliente",
    });
    setEditar(user._id);
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    api
      .delete(`/usuarios/${id}`)
      .then(() => {
        setUsuarios((u) => u.filter((x) => x._id !== id));
        setMensaje("Usuario eliminado con éxito.");
      })
      .catch(() => setMensaje("Error al eliminar usuario."));
  };

  if (!usuarioActual || usuarioActual.rol !== "admin") {
    return (
      <div className="admin-container">
        {mensaje && <div className="toast-mensaje">{mensaje}</div>}
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h2>Gestión de Usuarios</h2>
        <p>Administra los usuarios registrados en NeonByte</p>
      </header>

      <section className="user-form">
        <h3>{editar ? "Editar Usuario" : "Agregar Nuevo Usuario"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre Completo"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
          <select name="rol" value={formData.rol} onChange={handleChange}>
            <option value="cliente">Cliente</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">
            {editar ? "Actualizar Usuario" : "Crear Usuario"}
          </button>
        </form>
      </section>

      {mensaje && <div className="toast-mensaje">✔ {mensaje}</div>}

      <section className="table-container">
        <table>
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
            {usuarios.map((u) => (
              <tr key={u._id}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.fechaNacimiento?.slice(0, 10) || "—"}</td>
                <td>{u.rol}</td>
                <td className="acciones-cell">
                  <button className="btn-editar" type="button" onClick={() => handleEdit(u)}>
                    Editar
                  </button>
                  <button className="btn-eliminar" type="button" onClick={() => handleDelete(u._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminUsuarios;
