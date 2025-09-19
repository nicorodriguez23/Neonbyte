import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/MisOrdenes.css";

const MisOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/ordenes/mis-ordenes")
      .then((res) => {
        setOrdenes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener órdenes:", err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Cargando tus órdenes...</h2>;

  if (ordenes.length === 0) return <h3 style={{ textAlign: "center" }}>Aún no realizaste ninguna orden.</h3>;

  return (
    <div className="mis-ordenes">
      <h2>Mis Órdenes</h2>
      {ordenes.map((orden) => (
        <div key={orden._id} className="orden-card">
          <p><strong>ID:</strong> {orden._id}</p>
          <p><strong>Fecha:</strong> {new Date(orden.createdAt).toLocaleDateString()}</p>
          <p><strong>Total:</strong> ${orden.total}</p>
          <ul>
            {orden.productos.map((producto, idx) => (
              <li key={idx}>
                {producto.nombre} x {producto.cantidad}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MisOrdenes;
