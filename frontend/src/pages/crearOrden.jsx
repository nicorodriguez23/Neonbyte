import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/CrearOrden.css";

const CrearOrden = ({ carrito, setCarrito }) => {
  const navigate = useNavigate();
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const usuario = JSON.parse(localStorage.getItem("usuario")); 

  const [formulario, setFormulario] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    metodoPago: "",
    tipoTarjeta: "",
    numeroTarjeta: "",
    vencimiento: "",
    cvv: ""
  });

  const [mensajeExito, setMensajeExito] = useState("");

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const confirmarCompra = async () => {
    const camposObligatorios = ["nombre", "direccion", "ciudad", "codigoPostal", "metodoPago"];
    if (formulario.metodoPago === "credito" || formulario.metodoPago === "debito") {
      camposObligatorios.push("tipoTarjeta", "numeroTarjeta", "vencimiento", "cvv");
    }

    const camposIncompletos = camposObligatorios.filter((campo) => !formulario[campo]);
    if (camposIncompletos.length > 0) {
      alert("Por favor, completá todos los campos requeridos.");
      return;
    }

    const productosFormateados = carrito.map((item) => ({
      producto: item._id || item.id,
      cantidad: item.cantidad
    }));

    try {
      await api.post("/ordenes", {
        productos: productosFormateados,
        total,
      }, {
        headers: {
          Authorization: `Bearer ${usuario.token}`
        }
      });

      localStorage.setItem("total", JSON.stringify(total));
      setMensajeExito("Orden creada con éxito");

      setTimeout(() => {
        setMensajeExito("");
        navigate("/pago");
      }, 2000);
    } catch (error) {
      console.error("Error al confirmar compra:", error);
      alert("Hubo un error al crear la orden.");
    }
  };

  return (
    <div className="crear-orden-container">
      {mensajeExito && <div className="toast-message">{mensajeExito}</div>}

      <h2 className="titulo-orden">Resumen de tu Orden</h2>
      {carrito.map((item) => (
        <div key={item._id || item.id} className="orden-item">
          <img src={item.imagen} alt={item.nombre} />
          <div>
            <h3>{item.nombre}</h3>
            <p>Cantidad: {item.cantidad}</p>
            <p>Precio: ${item.precio.toFixed(2)}</p>
            <p>Subtotal: ${(item.precio * item.cantidad).toFixed(2)}</p>
          </div>
        </div>
      ))}

      <h3 className="total">Total a pagar: ${total.toFixed(2)}</h3>

      <h2 className="titulo-formulario">Datos de envío y pago</h2>
      <form className="formulario-pago">
        <input type="text" name="nombre" placeholder="Nombre completo" value={formulario.nombre} onChange={handleChange} required />
        <input type="text" name="direccion" placeholder="Dirección" value={formulario.direccion} onChange={handleChange} required />
        <input type="text" name="ciudad" placeholder="Ciudad" value={formulario.ciudad} onChange={handleChange} required />
        <input type="text" name="codigoPostal" placeholder="Código Postal" value={formulario.codigoPostal} onChange={handleChange} required />

        <select name="metodoPago" value={formulario.metodoPago} onChange={handleChange} required>
          <option value="">Seleccionar método de pago</option>
          <option value="mercadoPago">Mercado Pago</option>
          <option value="credito">Tarjeta de Crédito</option>
          <option value="debito">Tarjeta de Débito</option>
          <option value="transferencia">Transferencia Bancaria</option>
        </select>

        {(formulario.metodoPago === "credito" || formulario.metodoPago === "debito") && (
          <>
            <select name="tipoTarjeta" value={formulario.tipoTarjeta} onChange={handleChange} required>
              <option value="">Seleccionar tarjeta</option>
              <option value="visa">Visa</option>
              <option value="mastercard">MasterCard</option>
              <option value="amex">American Express</option>
            </select>
            <input type="text" name="numeroTarjeta" placeholder="Número de tarjeta" maxLength={16} value={formulario.numeroTarjeta} onChange={handleChange} required />
            <input type="text" name="vencimiento" placeholder="Fecha de vencimiento (MM/AA)" value={formulario.vencimiento} onChange={handleChange} required />
            <input type="text" name="cvv" placeholder="Código de seguridad (CVV)" maxLength={4} value={formulario.cvv} onChange={handleChange} required />
          </>
        )}

        <button type="button" className="btn-confirmar" onClick={confirmarCompra}>
          Confirmar compra
        </button>
      </form>
    </div>
  );
};

export default CrearOrden;
