import { Link } from "react-router-dom";
import logoNeonByte from "../assets/images/logo-neonbyte.png";
import logoUsuario from "../assets/images/logo-usuario.png";
import carritoIcon from "../assets/images/carrito.png";
import "../styles/navbar.css";

export default function Navbar({ carrito }) {
  // Calcular la cantidad total de productos en el carrito
  const cantidadTotalCarrito = carrito.reduce(
    (total, item) => total + (item.cantidad || 1),
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
        <li><Link to="/admin-productos">Admin Productos</Link></li>
        <li><Link to="/admin-usuarios">Admin Usuarios</Link></li>
      </ul>

      <div className="user-section">
        <Link to="/login">
          <img src={logoUsuario} alt="Usuario" className="avatar" />
        </Link>

        {/* Ícono de carrito con contador y link correcto */}
        <div className="cart-icon-container">
          <Link to="/carrito" className="cart-link">
            <img src={carritoIcon} alt="Carrito" className="cart-icon" />
            {cantidadTotalCarrito > 0 && (
              <span className="cart-count">{cantidadTotalCarrito}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
