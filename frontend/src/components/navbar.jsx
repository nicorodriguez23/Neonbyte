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
  const menuRef = useRef(null);

  const toggleMenuHamburguesa = () => setMenuAbierto((prev) => !prev);
  const cerrarMenu = () => setMenuAbierto(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMostrarMenuUsuario(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      <div className="navbar-info">
        <div className="info-item">
          <img src={truckIcon} alt="Camión" className="info-img" />
          <span>Seguí tu compra</span>
        </div>
        <div
          className="info-item"
          onClick={() =>
            window.open(
              "https://wa.me/5491122334455?text=Hola%20NeonByte!%20Quiero%20consultar%20por%20un%20producto",
              "_blank"
            )
          }
        >
          <img src={whatsappIcon} alt="WhatsApp" className="info-img" />
          <span>Venta por WhatsApp</span>
        </div>
      </div>

      <div
        className={`hamburguesa-icono ${menuAbierto ? "active" : ""}`}
        onClick={toggleMenuHamburguesa}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`menu-overlay ${menuAbierto ? "open" : ""}`}>
        <div className="menu-contenido">
          <img src={logoNeonByte} alt="NeonByte" className="menu-logo" />

          <Link to="/" onClick={cerrarMenu}>Home</Link>
          <Link to="/acerca" onClick={cerrarMenu}>Acerca</Link>
          <Link to="/contacto" onClick={cerrarMenu}>Contacto</Link>
          <Link to="/register" onClick={cerrarMenu}>Registro</Link>

          {usuario?.rol === "admin" && (
            <>
              <Link to="/admin-productos" onClick={cerrarMenu}>Admin Productos</Link>
              <Link to="/admin-usuarios" onClick={cerrarMenu}>Admin Usuarios</Link>
            </>
          )}

          <div className="menu-info">
            <div className="info-item">
              <img src={truckIcon} alt="Camión" className="info-img" />
              <span>Seguí tu compra</span>
            </div>
            <div
              className="info-item"
              onClick={() =>
                window.open(
                  "https://wa.me/5491122334455?text=Hola%20NeonByte!%20Quiero%20consultar%20por%20un%20producto",
                  "_blank"
                )
              }
            >
              <img src={whatsappIcon} alt="WhatsApp" className="info-img" />
              <span>Venta por WhatsApp</span>
            </div>
          </div>
        </div>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/acerca">Acerca</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/register">Registro</Link></li>

        {usuario?.rol === "admin" && (
          <>
            <li><Link to="/admin-productos">Admin Productos</Link></li>
            <li><Link to="/admin-usuarios">Admin Usuarios</Link></li>
          </>
        )}
      </ul>

      <div className="user-section">
        <div
          className="cart-icon-container"
          onClick={() => navigate("/carrito")}
        >
          <img src={carritoIcon} alt="Carrito" className="cart-icon" />
          {cantidadTotalCarrito > 0 && (
            <span className="cart-count">{cantidadTotalCarrito}</span>
          )}
        </div>

        <div className="menu-usuario" ref={menuRef}>
          <img
            src={logoUsuario}
            alt="Usuario"
            className="avatar"
            onClick={() => setMostrarMenuUsuario((prev) => !prev)}
          />

          {mostrarMenuUsuario && (
            <div className="menu-usuario-contenido visible">
              {usuario ? (
                <>
                  <span className="neonbyter-welcome">
                    Bienvenido, {usuario?.nombre || "NeonByter"}
                  </span>
                  <button onClick={cerrarSesion}>Cerrar sesión</button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate("/login")}>
                    Iniciar sesión
                  </button>
                  <button onClick={() => navigate("/register")}>
                    Registrarse
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
