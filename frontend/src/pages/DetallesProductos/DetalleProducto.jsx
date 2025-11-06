import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "../../styles/detalleProducto.css";


import monitorAcer from "../../assets/images/monitor.png";
import tarjetaGrafica from "../../assets/images/tarjeta-grafica.png";
import intelI9 from "../../assets/images/intel-i9.png";
import ramCorsair from "../../assets/images/ram.png";
import placaBase from "../../assets/images/placa.png";
import ssdSamsung from "../../assets/images/ssd-samsung.png";
import fuenteEVGA from "../../assets/images/fuente.png";
import tecladoCorsair from "../../assets/images/teclado.png";
import auricularesSteelSeries from "../../assets/images/auriculares.png";
import mouseLogitech from "../../assets/images/mouse-logitech-g502.png";

const imagenesLocales = {
  "Tarjeta Gráfica RTX 4090": tarjetaGrafica,
  "Procesador Intel i9-13900K": intelI9,
  "Memoria RAM Corsair Vengeance": ramCorsair,
  "Placa Base ASUS ROG Strix": placaBase,
  "SSD Samsung 970 EVO 1TB": ssdSamsung,
  "Fuente de Poder EVGA 750W": fuenteEVGA,
  "Teclado Mecánico Corsair K70": tecladoCorsair,
  "Monitor Acer Predator": monitorAcer,
  "Auriculares SteelSeries Arctis 7": auricularesSteelSeries,
  "Mouse Logitech G502 Lightspeed": mouseLogitech,
};

export default function DetalleProducto({ carrito, setCarrito }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/productos/${id}`)
      .then((res) => {
        const data = res.data;
        const productoConImagen = {
          ...data,
          imagen:
            imagenesLocales[data.nombre] ||
            data.imagen ||
            "/placeholder.svg",
        };
        setProducto(productoConImagen);
      })
      .catch((err) => {
        console.error("Error al obtener producto:", err.message);
        setError("Producto no encontrado");
      });
  }, [id]);

  const agregarAlCarrito = () => {
    if (!producto) return;
    const existe = carrito.find(
      (p) => (p._id || p.id) === (producto._id || producto.id)
    );

    if (existe) {
      const actualizado = carrito.map((p) =>
        (p._id || p.id) === (producto._id || producto.id)
          ? { ...p, cantidad: (p.cantidad || 1) + 1 }
          : p
      );
      setCarrito(actualizado);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  if (error)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px", color: "#00ffcc" }}>
        {error}
      </h2>
    );

  if (!producto)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px", color: "#00ffcc" }}>
        Cargando producto...
      </h2>
    );

  return (
    <div className="detalle-container">
      <header className="detalle-header">
        <h1 className="titulo-detalle">{producto.nombre}</h1>
      </header>

      <main className="detalle-producto">
        <div className="producto-imagen">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="imagen-detalle"
            onError={(e) => (e.target.src = "/placeholder.svg")}
          />
        </div>

        <div className="producto-info">
          <h2 className="precio">
            ${parseFloat(producto.precio).toFixed(2)}
          </h2>

          <p className="descripcion">{producto.descripcion}</p>

          {Array.isArray(producto.especificaciones) &&
            producto.especificaciones.length > 0 && (
              <div className="bloque-especificaciones">
                <h4 className="titulo-especificaciones">
                  Especificaciones técnicas:
                </h4>
                <ul className="especificaciones">
                  {producto.especificaciones.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}

          <button className="btn-agregar" onClick={agregarAlCarrito}>
            🛒 Agregar al Carrito
          </button>
        </div>
      </main>
    </div>
  );
}
