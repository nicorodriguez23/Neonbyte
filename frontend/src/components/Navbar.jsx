import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoNeonByte from "../assets/images/logo-neonbyte.png";
import logoUsuario from "../assets/images/usuario.png";
import carritoIcon from "../assets/images/carrito.png";
import "../styles/navbar.css";

import { obtenerUsuario, cerrarSesion as cerrarSesionUtil } from "../utils/auth";

export default function Navbar({
  carrito = [],
  usuario: usuarioProp = null,
  setUsuario,
  cerrarSesion: cerrarSesionProp,
}) {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuarioLocal, setUsuarioLocal] = useState(
    usuarioProp ?? obtenerUsuario()
  );
  const menuRef = useRef(null);

  useEffect(() => {
    if (usuarioProp) {
      setUsuarioLocal(usuarioProp);
    } else {
      const u = obtenerUsuario();
      setUsuarioLocal(u);
      if (u && typeof setUsuario === "function") {
        setUsuario(u);
      }
    }
  }, [usuarioProp, setUsuario]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (typeof cerrarSesionProp === "function") {
      cerrarSesionProp();
    } else {
      cerrarSesionUtil();
      if (typeof setUsuario === "function") setUsuario(null);
      setUsuarioLocal(null);
      navigate("/");
    }
    setMenuAbierto(false);
  };

  const cantidadTotalCarrito = carrito.reduce(
    (total, item) => total + (item?.cantidad || 1),
    0
  );

  return (
    <nav className="navbar">
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

        
        {usuarioLocal?.rol === "admin" && (
          <>
            <li><Link to="/admin-productos">Admin Productos</Link></li>
            <li><Link to="/admin-usuarios">Admin Usuarios</Link></li>
          </>
        )}
      </ul>

      <div className="user-section">
        {/* Ícono de carrito */}
        <div className="cart-icon-container">
          <Link to="/carrito" className="cart-link" aria-label="Ir al carrito">
            <img src={carritoIcon} alt="Carrito" className="cart-icon" />
            {cantidadTotalCarrito > 0 && (
              <span className="cart-count" aria-live="polite">
                {cantidadTotalCarrito}
              </span>
            )}
          </Link>
        </div>

        <div className="user-menu" ref={menuRef}>
          <button
            className="user-button"
            onClick={() => setMenuAbierto((s) => !s)}
            aria-haspopup="menu"
            aria-expanded={menuAbierto}
          >
            <img src={logoUsuario} alt="Usuario" className="avatar" />
          </button>

          {menuAbierto && (
            <div className="user-dropdown" role="menu">
              {!usuarioLocal ? (
                <>
                  <Link
                    to="/login"
                    className="dropdown-item"
                    onClick={() => setMenuAbierto(false)}
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/register"
                    className="dropdown-item"
                    onClick={() => setMenuAbierto(false)}
                  >
                    Registrarse
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/perfil"
                    className="dropdown-item"
                    onClick={() => setMenuAbierto(false)}
                  >
                    Mi perfil
                  </Link>
                  <Link
                    to="/mis-ordenes"
                    className="dropdown-item"
                    onClick={() => setMenuAbierto(false)}
                  >
                    Mis órdenes
                  </Link>
                  <button
                    className="dropdown-item logout-button"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
