import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import api from "../services/api.js";
import { guardarSesion } from "../utils/auth";
import { showSuccess, showError } from "../utils/toast";

const Login = ({ setUsuario }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showError("Todos los campos son obligatorios");
      return;
    }

    setCargando(true);

    try {
      const { data } = await api.post("/usuarios/login", { email, password });

      const token = data?.token || data?.accessToken || null;
      let usuarioFinal = data?.usuario ?? data?.user ?? null;

      if (!usuarioFinal && token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          usuarioFinal = {
            nombre: payload.nombre || payload.name || "NeonByter",
            rol: payload.rol || payload.role || "cliente",
            _id: payload._id || payload.id || payload.sub,
          };
        } catch (err) {
          
          usuarioFinal = { nombre: data?.nombre || "NeonByter", rol: "cliente" };
        }
      }

      guardarSesion(token, usuarioFinal);

      if (typeof setUsuario === "function") {
        setUsuario(usuarioFinal);
      }

      const nombreParaMostrar = usuarioFinal?.nombre || "NeonByter";
      showSuccess(`Bienvenido ${nombreParaMostrar} 🎮`);

      setTimeout(() => {
        if (usuarioFinal?.rol === "admin") {
          navigate("/admin-productos");
        } else {
          navigate("/");
        }
      }, 1200);
    } catch (err) {

      const msg =
        err?.response?.data?.mensaje ||
        err?.response?.data?.message ||
        "Usuario o contraseña incorrectos";
      showError(msg);
      console.error("Login error:", err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={cargando}
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={cargando}
          />
        </div>

        <button type="submit" disabled={cargando}>
          {cargando ? "Cargando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default Login;
