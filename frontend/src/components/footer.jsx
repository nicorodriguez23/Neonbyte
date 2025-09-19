import "../styles/Footer.css";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>NeonByte</h3>
          <p>Componentes gamer de alto rendimiento.</p>
          <p>Envíos a todo el país - Soporte 24hs</p>
        </div>

        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaXTwitter /></a>
          </div>
          <div className="footer-bottom">
            © 2025 NeonByte - Todos los derechos reservados
          </div>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Email: soporte@neonbyte.com</p>
          <p>Teléfono: 11-1122-3344</p>
        </div>
      </div>
    </footer>
  );
}
