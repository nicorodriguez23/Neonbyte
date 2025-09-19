import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logoNeonByte from "../assets/images/logo-neonbyte.png";
import logoUsuario from "../assets/images/logo-usuario.png";
import carritoIcon from "../assets/images/carrito.png";
import "../styles/navbar.css";

export default function Navbar({ carrito, usuario, cerrarSesion }) {
  const navigate = useNavigate();
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
    if (usuario && usuario.nombre) {
      setNombreUsuario(usuario.nombre);
    }
  }, [usuario]);

  const toggleMenu = () => {
    setMostrarMenu(!mostrarMenu);
  };

  const manejarClickUsuario = () => {
    if (usuario) {
      toggleMenu();
    } else {
      navigate("/login");
    }
  };

  const toggleHamburguesa = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarYRedirigir = (ruta) => {
    setMenuAbierto(false);
    navigate(ruta);
  };

  return (
    <nav className="navbar">
      <div className="hamburguesa-icono" onClick={toggleHamburguesa}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {menuAbierto && (
        <div className="menu-hamburguesa open">
          <div className="logo-menu">
            <img src={logoNeonByte} alt="NeonByte" />
          </div>
          <nav>
            <button onClick={() => cerrarYRedirigir("/")}>Home</button>
            <button onClick={() => cerrarYRedirigir("/acerca")}>Acerca</button>
            <button onClick={() => cerrarYRedirigir("/contacto")}>Contacto</button>
            <button onClick={() => cerrarYRedirigir("/register")}>Registro</button>
            <button onClick={() => cerrarYRedirigir("/admin-productos")}>Admin Productos</button>
            <button onClick={() => cerrarYRedirigir("/admin-usuarios")}>Admin Usuarios</button>
          </nav>
        </div>
      )}

      <div className="navbar-logo">
        <Link to="/">
          <img src={logoNeonByte} alt="NeonByte" />
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/acerca">Acerca</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/register">Registro</Link></li>
        <li><Link to="/admin-productos">Admin Productos</Link></li>
        <li><Link to="/admin-usuarios">Admin Usuarios</Link></li>
      </ul>

      <div className="user-section">
        <div className="cart-icon-container" onClick={() => navigate("/carrito")}>
          <img src={carritoIcon} alt="Carrito" className="cart-icon" />
          {carrito.length > 0 && (
            <span className="cart-count">
              {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
            </span>
          )}
        </div>

        <div className="menu-usuario">
          <img
            src={logoUsuario}
            alt="Usuario"
            className="avatar"
            onClick={manejarClickUsuario}
          />
          {mostrarMenu && (
            <div className="menu-usuario-contenido visible">
              {usuario ? (
                <>
                  <span className="neonbyter-welcome">Bienvenido, {nombreUsuario || 'NeonByter'}</span>
                  <button onClick={cerrarSesion}>Cerrar sesión</button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate("/login")}>Iniciar sesión</button>
                  <button onClick={() => navigate("/register")}>Registrarse</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
