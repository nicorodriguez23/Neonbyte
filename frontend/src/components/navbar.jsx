import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoNeonByte from "../assets/images/logo-neonbyte.png";
import logoUsuario from "../assets/images/usuario.png";
import carritoIcon from "../assets/images/carrito.png";
import truckIcon from "../assets/images/camion.jpg";
import whatsappIcon from "../assets/images/whatsapp.png";
import "../styles/navbar.css";

export default function Navbar({ carrito = [], usuario, cerrarSesion }) {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  const [mostrarMenuAdmin, setMostrarMenuAdmin] = useState(false);
  const menuRef = useRef(null);
  const adminRef = useRef(null);

  const cerrarMenu = () => setMenuAbierto(false);

  useEffect(() => {
    document.body.style.overflow = menuAbierto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuAbierto]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMostrarMenuUsuario(false);
      if (adminRef.current && !adminRef.current.contains(e.target))
        setMostrarMenuAdmin(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cantidadTotalCarrito = carrito.reduce(
    (total, item) => total + (item?.cantidad || 1), 0
  );

  return (
    <>
      <nav className="navbar">
        {/* Hamburguesa al lado del logo — solo mobile */}
        <button
          className={`hamburguesa-icono ${menuAbierto ? "active" : ""}`}
          onClick={() => setMenuAbierto((prev) => !prev)}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" onClick={cerrarMenu}>
            <img src={logoNeonByte} alt="NeonByte" />
          </Link>
        </div>

        {/* Info desktop */}
        <div className="navbar-info">
          <div className="info-item">
            <img src={truckIcon} alt="Camión" className="info-img" />
            <span>Seguí tu compra</span>
          </div>
          <div className="info-item" onClick={() =>
            window.open("https://wa.me/5491122334455?text=Hola%20NeonByte!", "_blank")
          }>
            <img src={whatsappIcon} alt="WhatsApp" className="info-img" />
            <span>Venta por WhatsApp</span>
          </div>
        </div>

        {/* Links desktop */}
        <ul className="navbar-links">
          <li><Link to="/">Hogar</Link></li>
          <li><Link to="/acerca">Acerca</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          <li><Link to="/register">Registro</Link></li>
          {usuario?.rol === "admin" && (
            <li className="admin-dropdown" ref={adminRef}>
              <button className="admin-dropdown-btn"
                onClick={() => setMostrarMenuAdmin((prev) => !prev)}>
                ⚙ Admin
                <span className={`admin-arrow ${mostrarMenuAdmin ? "open" : ""}`}>▾</span>
              </button>
              {mostrarMenuAdmin && (
                <div className="admin-dropdown-menu">
                  <Link to="/admin-productos" onClick={() => setMostrarMenuAdmin(false)}>📦 Productos</Link>
                  <Link to="/admin-usuarios" onClick={() => setMostrarMenuAdmin(false)}>👥 Usuarios</Link>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Carrito + Avatar */}
        <div className="user-section">
          <div className="cart-icon-container" onClick={() => navigate("/carrito")}>
            <img src={carritoIcon} alt="Carrito" className="cart-icon" />
            {cantidadTotalCarrito > 0 && (
              <span className="cart-count">{cantidadTotalCarrito}</span>
            )}
          </div>
          <div className="menu-usuario" ref={menuRef}>
            <img src={logoUsuario} alt="Usuario" className="avatar"
              onClick={() => setMostrarMenuUsuario((prev) => !prev)} />
            {mostrarMenuUsuario && (
              <div className="menu-usuario-contenido visible">
                {usuario ? (
                  <>
                    <span className="neonbyter-welcome">
                      Bienvenido/a, {usuario?.nombre || "NeonByter"}
                    </span>
                    <button onClick={cerrarSesion}>Cerrar sesión</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { navigate("/login"); setMostrarMenuUsuario(false); }}>Iniciar sesión</button>
                    <button onClick={() => { navigate("/register"); setMostrarMenuUsuario(false); }}>Registrarse</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      <div className={`menu-backdrop ${menuAbierto ? "open" : ""}`} onClick={cerrarMenu} />

      {/* Menú lateral — desde la izquierda */}
      <aside className={`menu-lateral ${menuAbierto ? "open" : ""}`}>
        <div className="menu-lateral-header">
          <img src={logoNeonByte} alt="NeonByte" className="menu-logo" />
          <button className="menu-cerrar" onClick={cerrarMenu} aria-label="Cerrar">✕</button>
        </div>

        <nav className="menu-lateral-nav">
          <Link to="/" onClick={cerrarMenu}><span className="menu-icon">🏠</span> Hogar</Link>
          <Link to="/acerca" onClick={cerrarMenu}><span className="menu-icon">ℹ️</span> Acerca</Link>
          <Link to="/contacto" onClick={cerrarMenu}><span className="menu-icon">📩</span> Contacto</Link>
          <Link to="/register" onClick={cerrarMenu}><span className="menu-icon">📝</span> Registro</Link>
          <Link to="/carrito" onClick={cerrarMenu}>
            <span className="menu-icon">🛒</span> Carrito
            {cantidadTotalCarrito > 0 && <span className="menu-badge">{cantidadTotalCarrito}</span>}
          </Link>
          {usuario?.rol === "admin" && (
            <div className="menu-admin-section">
              <span className="menu-admin-label">⚙ ADMIN</span>
              <Link to="/admin-productos" onClick={cerrarMenu}><span className="menu-icon">📦</span> Gestión de Productos</Link>
              <Link to="/admin-usuarios" onClick={cerrarMenu}><span className="menu-icon">👥</span> Gestión de Usuarios</Link>
            </div>
          )}
        </nav>

        <div className="menu-lateral-footer">
          {usuario ? (
            <div className="menu-usuario-info">
              <span className="menu-usuario-nombre">👤 {usuario.nombre}</span>
              <button className="menu-btn-sesion danger" onClick={() => { cerrarSesion(); cerrarMenu(); }}>Cerrar sesión</button>
            </div>
          ) : (
            <div className="menu-usuario-info">
              <button className="menu-btn-sesion" onClick={() => { navigate("/login"); cerrarMenu(); }}>Iniciar sesión</button>
              <button className="menu-btn-sesion outline" onClick={() => { navigate("/register"); cerrarMenu(); }}>Registrarse</button>
            </div>
          )}
          <div className="menu-info-items">
            <div className="info-item">
              <img src={truckIcon} alt="" className="info-img" />
              <span>Seguí tu compra</span>
            </div>
            <div className="info-item" onClick={() => window.open("https://wa.me/5491122334455", "_blank")}>
              <img src={whatsappIcon} alt="" className="info-img" />
              <span>Venta por WhatsApp</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}