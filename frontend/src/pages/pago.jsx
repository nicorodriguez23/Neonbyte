import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pago.css";
import logo from "../assets/images/logo-neonbyte.png";


const generarCodigo = () => {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letra = letras[Math.floor(Math.random() * letras.length)];
  const numeros = Math.floor(Math.random() * 900000 + 100000);
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
              font-family: 'Segoe UI', Tahoma, sans-serif;
              padding: 20px;
              background-color: #0f0f0f;
              color: #00ffcc;
            }
            h1 { text-align: center; margin-bottom: 10px; }
            .logo {
              display: block;
              margin: 0 auto 10px auto;
              width: 80px;
            }
            .box {
              border: 2px solid #00ffcc;
              border-radius: 10px;
              padding: 20px;
              max-width: 500px;
              margin: 0 auto;
              background: #1a1a1a;
            }
            ul { list-style: none; padding: 0; }
            li { margin-bottom: 10px; }
            hr { border: none; border-top: 1px solid #00ffcc55; margin: 15px 0; }
          </style>
        </head>
        <body>
          <img src="${logo}" class="logo" alt="NeonByte" />
          <h1>Comprobante de Compra</h1>
          <div class="box">
            <p><strong>Código de Orden:</strong> ${codigoPago}</p>
            <p><strong>Cliente:</strong> ${usuario?.nombre || "Usuario Invitado"}</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
            <hr />
            <h3>Productos:</h3>
            <ul>
              ${carrito
                .map(
                  (item) =>
                    `<li>${item.nombre} x ${item.cantidad} = $${(
                      item.precio * item.cantidad
                    ).toFixed(2)}</li>`
                )
                .join("")}
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
      <img src={logo} alt="NeonByte" className="logo-comprobante" />
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
              {item.nombre} x {item.cantidad} = ${(
                item.precio * item.cantidad
              ).toFixed(2)}
            </li>
          ))}
        </ul>
        <hr />
        <p><strong>Total pagado:</strong> ${total.toFixed(2)}</p>
        <p><strong>Método de pago:</strong> Confirmado</p>
        <p><strong>Estado:</strong> Aprobado ✅</p>

        <div className="botones-pago">
          <button onClick={imprimirComprobante} className="btn-imprimir">
            🖨️ Imprimir
          </button>
          <button onClick={volverAlInicio} className="btn-volver">
            🏠 Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pago;
