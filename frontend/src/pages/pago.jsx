import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pago.css";

const generarCodigo = () => {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numeros = Math.floor(Math.random() * 900000 + 100000);
  const letra = letras[Math.floor(Math.random() * letras.length)];
  return `NB-${letra}${numeros}`;
};

const Pago = ({ carrito, total, usuario, setCarrito }) => {
  const navigate = useNavigate();
  const [codigoPago, setCodigoPago] = useState("");
  const comprobanteRef = useRef();
  const fecha = new Date().toLocaleString();

  useEffect(() => {
    setCodigoPago(generarCodigo());
  }, []);

  const imprimirComprobante = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Comprobante NeonByte</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              background-color: #0f0f0f;
              color: #00fff7;
            }
            h1 { text-align: center; }
            .box {
              border: 2px solid #00fff7;
              border-radius: 10px;
              padding: 20px;
            }
            ul { padding: 0; list-style: none; }
            li { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h1>🧾 Comprobante de Compra - NeonByte</h1>
          <div class="box">
            <p><strong>Código de Orden:</strong> ${codigoPago}</p>
            <p><strong>Cliente:</strong> ${usuario?.nombre || "Usuario Invitado"}</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
            <hr />
            <h3>Productos:</h3>
            <ul>
              ${carrito.map(item => `
                <li>${item.nombre} x ${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}</li>
              `).join("")}
            </ul>
            <hr />
            <p><strong>Total pagado:</strong> $${total.toFixed(2)}</p>
            <p><strong>Método de pago:</strong> Confirmado</p>
            <p><strong>Estado:</strong> Aprobado ✅</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const volverAlInicio = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
    navigate("/");
  };

  return (
    <div className="pago-container" ref={comprobanteRef}>
      <h1>🧾 Comprobante de Compra</h1>
      <div className="pago-box">
        <p><strong>Código de Orden:</strong> {codigoPago}</p>
        <p><strong>Cliente:</strong> {usuario?.nombre || "Usuario Invitado"}</p>
        <p><strong>Fecha y hora:</strong> {fecha}</p>
        <hr />
        <h3>Productos:</h3>
        <ul>
          {carrito.map((item) => (
            <li key={item._id || item.id}>
              {item.nombre} x {item.cantidad} = ${(item.precio * item.cantidad).toFixed(2)}
            </li>
          ))}
        </ul>
        <hr />
        <p><strong>Total pagado:</strong> ${total.toFixed(2)}</p>
        <p><strong>Método de pago:</strong> Confirmado</p>
        <p><strong>Estado:</strong> Aprobado ✅</p>

        <div className="botones-pago">
          <button onClick={imprimirComprobante}>🖨️ Imprimir</button>
          <button onClick={volverAlInicio}>🏠 Volver al inicio</button>
        </div>
      </div>
    </div>
  );
};

export default Pago;
