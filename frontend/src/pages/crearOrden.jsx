import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/crearOrden.css";

const CrearOrden = ({ carrito, setCarrito }) => {
  const navigate = useNavigate();

  // leo usuario guardado y token
  const usuario = JSON.parse(localStorage.getItem("usuario")) || null;
  const token = localStorage.getItem("token") || null;

  // total de la orden (fallback a 1 unidad si no hay cantidad)
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * (item.cantidad || 1),
    0
  );

  // datos del formulario de envío y pago
  const [formulario, setFormulario] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    metodoPago: "",
    tipoTarjeta: "",
    numeroTarjeta: "",
    vencimiento: "",
    cvv: "",
  });

  const [mensajeExito, setMensajeExito] = useState("");

  // manejo de inputs
  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  // intento de confirmación de compra / creación de orden
  const confirmarCompra = async () => {
    // 1. ¿está logueado el usuario?
    if (!token || !usuario) {
      alert("Tenés que iniciar sesión para confirmar la compra.");
      navigate("/login");
      return;
    }

    // 2. ¿hay productos en el carrito?
    if (!carrito || carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // 3. validación de campos requeridos (envío + pago)
    const requeridosBase = [
      "nombre",
      "direccion",
      "ciudad",
      "codigoPostal",
      "metodoPago",
    ];

    // si paga con tarjeta pedimos los extras
    if (
      formulario.metodoPago === "credito" ||
      formulario.metodoPago === "debito"
    ) {
      requeridosBase.push(
        "tipoTarjeta",
        "numeroTarjeta",
        "vencimiento",
        "cvv"
      );
    }

    // chequeo campos vacíos
    const incompletos = requeridosBase.filter(
      (campo) => !formulario[campo] || formulario[campo].trim() === ""
    );

    if (incompletos.length > 0) {
      alert("Por favor, completá todos los campos requeridos.");
      return;
    }

    // 4. armo payload de productos para la orden
    const productosFormateados = carrito.map((item) => ({
      producto: item._id || item.id, // por si viene de Mongo o mock local
      cantidad: item.cantidad || 1,
    }));

    try {
      // 5. envío al backend
      await api.post(
        "/ordenes",
        {
          productos: productosFormateados,
          total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // guardo el total para la pantalla de pago / comprobante
      localStorage.setItem("total", JSON.stringify(total));

      // msj visual
      setMensajeExito("Orden creada con éxito ✅");

      // opcional: limpiar carrito en memoria/localStorage si ya tenés esa lógica
      // setCarrito([]);
      // localStorage.removeItem("carrito");

      // 6. redirección suave a "pago"
      setTimeout(() => {
        setMensajeExito("");
        navigate("/pago");
      }, 2000);
    } catch (error) {
      console.error("Error al confirmar compra:", error);
      alert("No se pudo crear la orden. Intentá de nuevo.");
    }
  };

  return (
    <div className="crear-orden-container">
      {/* toast arriba a la derecha si salió todo bien */}
      {mensajeExito && <div className="toast-message">{mensajeExito}</div>}

      {/* resumen del carrito */}
      <h2 className="titulo-orden">Resumen de tu Orden</h2>

      {carrito.map((item) => (
        <div key={item._id || item.id} className="orden-item">
          <img src={item.imagen} alt={item.nombre} />
          <div>
            <h3>{item.nombre}</h3>
            <p>Cantidad: {item.cantidad || 1}</p>
            <p>Precio: ${item.precio.toFixed(2)}</p>
            <p>
              Subtotal: $
              {(item.precio * (item.cantidad || 1)).toFixed(2)}
            </p>
          </div>
        </div>
      ))}

      <h3 className="total">Total a pagar: ${total.toFixed(2)}</h3>

      {/* formulario de datos de envío y pago */}
      <h2 className="titulo-formulario">Datos de envío y pago</h2>

      <form className="formulario-pago">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formulario.nombre}
          onChange={handleChange}
          autoComplete="name"
          required
        />

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formulario.direccion}
          onChange={handleChange}
          autoComplete="street-address"
          required
        />

        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={formulario.ciudad}
          onChange={handleChange}
          autoComplete="address-level2"
          required
        />

        <input
          type="text"
          name="codigoPostal"
          placeholder="Código Postal"
          value={formulario.codigoPostal}
          onChange={handleChange}
          autoComplete="postal-code"
          required
        />

        <select
          name="metodoPago"
          value={formulario.metodoPago}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar método de pago</option>
          <option value="mercadoPago">Mercado Pago</option>
          <option value="credito">Tarjeta de Crédito</option>
          <option value="debito">Tarjeta de Débito</option>
          <option value="transferencia">Transferencia Bancaria</option>
        </select>

        {(formulario.metodoPago === "credito" ||
          formulario.metodoPago === "debito") && (
          <>
            <select
              name="tipoTarjeta"
              value={formulario.tipoTarjeta}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar tarjeta</option>
              <option value="visa">Visa</option>
              <option value="mastercard">MasterCard</option>
              <option value="amex">American Express</option>
            </select>

            <input
              type="text"
              name="numeroTarjeta"
              placeholder="Número de tarjeta"
              maxLength={16}
              value={formulario.numeroTarjeta}
              onChange={handleChange}
              autoComplete="cc-number"
              required
            />

            <input
              type="text"
              name="vencimiento"
              placeholder="Fecha de vencimiento (MM/AA)"
              value={formulario.vencimiento}
              onChange={handleChange}
              autoComplete="cc-exp"
              required
            />

            <input
              type="text"
              name="cvv"
              placeholder="Código de seguridad (CVV)"
              maxLength={4}
              value={formulario.cvv}
              onChange={handleChange}
              autoComplete="cc-csc"
              required
            />
          </>
        )}

        <button
          type="button"
          className="btn-confirmar"
          onClick={confirmarCompra}
        >
          Confirmar compra
        </button>
      </form>
    </div>
  );
};

export default CrearOrden;
