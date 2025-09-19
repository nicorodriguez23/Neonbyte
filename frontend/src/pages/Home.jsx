import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import api from "../services/api";

import monitorAcer from "../assets/images/monitor.png";
import tarjetaGrafica from "../assets/images/tarjeta-grafica.png";
import intelI9 from "../assets/images/intel-i9.png";
import ramCorsair from "../assets/images/ram.png";
import placaBase from "../assets/images/placa.png";
import ssdSamsung from "../assets/images/ssd-samsung.png";
import fuenteEVGA from "../assets/images/fuente.png";
import tecladoCorsair from "../assets/images/teclado.png";
import auricularesSteelSeries from "../assets/images/auriculares.png";
import bannerNeonByte from "../assets/images/banner-neonbyte.webp";
import banner2 from "../assets/images/banner2.webp";
import banner3 from "../assets/images/banner3.webp";

import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

const Home = ({ usuario, carrito, setCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    api
      .get("/productos")
      .then((res) => {
        const productosConImagen = res.data.map((p) => ({
          ...p,
          imagen: imagenesLocales[p.nombre] || "/placeholder.svg",
        }));
        setProductos(productosConImagen);
      })
      .catch((err) => console.error("Error al obtener productos:", err));
  }, []);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item._id === producto._id);
    const nuevoCarrito = existe
      ? carrito.map((item) =>
          item._id === producto._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      : [...carrito, { ...producto, cantidad: 1 }];

    setCarrito(nuevoCarrito);
    setMensaje(`Se agregó "${producto.nombre}" al carrito`);
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <>
      <section className="hero">
        <Carousel fade controls={false} indicators={false} interval={3000} slide={true}>
          <Carousel.Item>
            <img className="d-block w-100 banner-img" src={bannerNeonByte} alt="Banner NeonByte 1" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 banner-img" src={banner2} alt="Banner NeonByte 2" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 banner-img" src={banner3} alt="Banner NeonByte 3" />
          </Carousel.Item>
        </Carousel>
      </section>

      <div className="hero-btn-container">
        <a href="#productos" className="btn hero-btn">Ver Productos</a>
      </div>

      {usuario && (
        <div className="bienvenida-usuario">
          <h2>Bienvenido, {usuario.nombre}</h2>
        </div>
      )}

      {mensaje && <div className="toast-mensaje">{mensaje}</div>}

      <section id="productos" className="productos">
        <h1>BIENVENIDO A NEONBYTE: TU DESTINO GAMER DEFINITIVO</h1>
        <strong>
          En NeonByte, llevamos la experiencia del gaming al siguiente nivel. Nos especializamos en
          ofrecer los mejores componentes y periféricos para PC gamer, con productos de última
          generación, precios competitivos y un servicio de atención al cliente excepcional.
        </strong>

        <h2>Productos Destacados</h2>

        <div className="productos-grid">
          {productos.map((producto) => (
            <div key={producto._id} className="producto">
              <img src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>${producto.precio}</p>
              <Link to={`/producto/${producto._id}`} className="btn">Ver Detalles</Link>
              <button onClick={() => agregarAlCarrito(producto)} className="btn-agregar">Comprar</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
