import { useNavigate } from "react-router-dom";
import "../styles/notFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-glitch-wrapper">
        <h1 className="notfound-code" data-text="404">404</h1>
      </div>

      <div className="notfound-content">
        <h2 className="notfound-title">SIGNAL LOST</h2>
        <p className="notfound-desc">
          La página que buscás no existe o fue movida a otro sector de la red.
        </p>

        <div className="notfound-actions">
          <button className="notfound-btn-primary" onClick={() => navigate("/")}>
            Volver al Inicio
          </button>
          <button className="notfound-btn-secondary" onClick={() => navigate(-1)}>
            Página Anterior
          </button>
        </div>
      </div>

      {/* Líneas decorativas animadas */}
      <div className="notfound-lines">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}