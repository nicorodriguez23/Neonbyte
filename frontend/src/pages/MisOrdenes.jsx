import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/misordenes.css";

const MisOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/ordenes/mis-ordenes")
      .then((res) => { setOrdenes(res.data); setLoading(false); })
      .catch((err) => { console.error("Error al obtener órdenes:", err.message); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="mis-ordenes">
      <h2>Mis Órdenes</h2>
      <h3>Cargando tus órdenes...</h3>
    </div>
  );

  if (ordenes.length === 0) return (
    <div className="mis-ordenes">
      <h2>Mis Órdenes</h2>
      <h3>Aún no realizaste ninguna orden.</h3>
    </div>
  );

  return (
    <div className="mis-ordenes">
      <h2>Mis Órdenes</h2>
      {ordenes.map((orden) => (
        <div key={orden._id} className="orden-card">
          <p><strong>ID:</strong> {orden._id}</p>
          <p><strong>Fecha:</strong> {new Date(orden.createdAt).toLocaleDateString()}</p>
          <p>
            <strong>Total:</strong> ${orden.total}
            <span className={`orden-estado ${orden.estado || "pendiente"}`} style={{ marginLeft: "12px" }}>
              {orden.estado || "pendiente"}
            </span>
          </p>
          <hr />
          <ul>
            {orden.productos.map((producto, idx) => (
              <li key={idx}>
                {producto.producto?.nombre || producto.nombre || "Producto"} x {producto.cantidad}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MisOrdenes;