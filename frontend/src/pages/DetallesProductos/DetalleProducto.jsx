import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "../../styles/DetalleProducto.css";

// Imágenes locales
import monitorAcer from "../../assets/images/monitor.png";
import tarjetaGrafica from "../../assets/images/tarjeta-grafica.png";
import intelI9 from "../../assets/images/intel-i9.png";
import ramCorsair from "../../assets/images/ram.png";
import placaBase from "../../assets/images/placa.png";
import ssdSamsung from "../../assets/images/ssd-samsung.png";
import fuenteEVGA from "../../assets/images/fuente.png";
import tecladoCorsair from "../../assets/images/teclado.png";
import auricularesSteelSeries from "../../assets/images/auriculares.png";

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
};

export default function DetalleProducto({ carrito, setCarrito }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/productos/${id}`)
      .then((res) => {
        const productoConImagen = {
          ...res.data,
          imagen: imagenesLocales[res.data.nombre] || "/placeholder.svg",
        };
        setProducto(productoConImagen);
      })
      .catch((err) => {
        console.error("Error al obtener producto:", err.message);
        setError("Producto no encontrado");
      });
  }, [id]);

  const agregarAlCarrito = () => {
    setCarrito([...carrito, producto]);
  };

  if (error) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>{error}</h2>;
  }

  if (!producto) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Cargando producto...</h2>;
  }

  return (
    <>
      <header className="header">
        <h1 className="titulo-detalle">{producto.nombre}</h1>
      </header>

      <main className="detalle-producto">
        <div className="producto-imagen">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="producto-info">
          <h2 className="precio">${parseFloat(producto.precio).toFixed(2)}</h2>
          <p className="descripcion">{producto.descripcion}</p>

          {Array.isArray(producto.especificaciones) && (
            <ul className="especificaciones">
              {producto.especificaciones.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          )}

          <button className="btn-agregar" onClick={agregarAlCarrito}>
            Agregar al Carrito
          </button>
        </div>
      </main>
    </>
  );
}
