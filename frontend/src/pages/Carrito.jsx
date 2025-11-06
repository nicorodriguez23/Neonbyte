import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/carrito.css";

const Carrito = ({ carrito, setCarrito }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const sumarProducto = (id) => {
    const actualizado = carrito.map((item) =>
      (item._id || item.id) === id
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    );
    setCarrito(actualizado);
  };

  const restarProducto = (id) => {
    const actualizado = carrito.map((item) =>
      (item._id || item.id) === id && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    );
    setCarrito(actualizado);
  };

  const eliminarProducto = (id) => {
    const actualizado = carrito.filter(
      (item) => (item._id || item.id) !== id
    );
    setCarrito(actualizado);
  };

  const irAPagar = () => {
    navigate("/crear-orden");
  };

  const getImagenProducto = (item) => {
    if (item.imagen) return item.imagen;

    if (item.nombre === "Mouse Logitech G502 Lightspeed") {
      return "/src/assets/images/mouse-logitech-g502.png";
    }

    return "/placeholder.svg";
  };

  return (
    <div className="carrito-container">
      <h1 className="titulo-carrito">🛒 Carrito de Compras</h1>

      {carrito.length === 0 ? (
        <p className="carrito-vacio">El carrito está vacío.</p>
      ) : (
        <>
          <ul className="carrito-listado">
            {carrito.map((item) => (
              <li key={item._id || item.id} className="carrito-item">
                <img
                  className="carrito-img"
                  src={getImagenProducto(item)}
                  alt={item.nombre}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />

                <div className="carrito-info">
                  <h3>{item.nombre}</h3>
                  <p>Precio unitario: ${item.precio}</p>

                  <div className="cantidad-controles">
                    <button
                      className="btn-cantidad"
                      onClick={() => restarProducto(item._id || item.id)}
                    >
                      -
                    </button>

                    <span>{item.cantidad}</span>

                    <button
                      className="btn-cantidad"
                      onClick={() => sumarProducto(item._id || item.id)}
                    >
                      +
                    </button>
                  </div>

                  <p className="subtotal">
                    Subtotal: ${(item.precio * item.cantidad).toFixed(2)}
                  </p>

                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarProducto(item._id || item.id)}
                  >
                    ✖ Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="carrito-resumen">
            <h3 className="carrito-total">
              Total: ${total.toFixed(2)}
            </h3>

            <button onClick={irAPagar} className="btn-ir-pagar">
              💳 Ir a pagar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
