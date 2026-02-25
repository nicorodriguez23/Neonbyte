import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pago.css";
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

    const itemsHTML = carrito
      .map(
        (item) => `
        <tr>
          <td>${item.nombre}</td>
          <td style="text-align:center">${item.cantidad}</td>
          <td style="text-align:right">$${item.precio.toFixed(2)}</td>
          <td style="text-align:right">$${(item.precio * item.cantidad).toFixed(2)}</td>
        </tr>`
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Comprobante NeonByte - ${codigoPago}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Exo+2:wght@400;500;600&display=swap');

            * { margin: 0; padding: 0; box-sizing: border-box; }

            body {
              font-family: 'Exo 2', 'Segoe UI', sans-serif;
              background: #fff;
              color: #1a1a2e;
              padding: 32px;
              max-width: 640px;
              margin: 0 auto;
            }

            /* Header */
            .header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-bottom: 20px;
              border-bottom: 2px solid #00c8d4;
              margin-bottom: 24px;
            }
            .header-left {
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .logo {
              width: 52px;
              height: 52px;
              border-radius: 50%;
              border: 2px solid #00c8d4;
            }
            .brand-name {
              font-family: 'Rajdhani', sans-serif;
              font-size: 1.6rem;
              font-weight: 700;
              color: #00c8d4;
              letter-spacing: 1px;
            }
            .brand-sub {
              font-size: 0.75rem;
              color: #666;
              letter-spacing: 0.5px;
            }
            .header-right {
              text-align: right;
            }
            .comprobante-title {
              font-family: 'Rajdhani', sans-serif;
              font-size: 1.1rem;
              font-weight: 700;
              color: #1a1a2e;
              letter-spacing: 0.5px;
            }
            .orden-code {
              font-size: 0.85rem;
              color: #00c8d4;
              font-weight: 600;
              margin-top: 4px;
            }

            /* Info cliente */
            .info-section {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              margin-bottom: 24px;
              background: #f8fafc;
              border-radius: 8px;
              padding: 16px;
              border: 1px solid #e2e8f0;
            }
            .info-item label {
              font-size: 0.7rem;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: #888;
              display: block;
              margin-bottom: 3px;
            }
            .info-item span {
              font-size: 0.9rem;
              font-weight: 600;
              color: #1a1a2e;
            }

            /* Tabla productos */
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            thead tr {
              background: #00c8d4;
              color: #fff;
            }
            thead th {
              font-family: 'Rajdhani', sans-serif;
              font-size: 0.8rem;
              letter-spacing: 1px;
              text-transform: uppercase;
              padding: 10px 12px;
              font-weight: 700;
            }
            tbody tr {
              border-bottom: 1px solid #e2e8f0;
            }
            tbody tr:last-child { border-bottom: none; }
            tbody td {
              padding: 10px 12px;
              font-size: 0.88rem;
              color: #333;
            }
            tbody tr:nth-child(even) { background: #f8fafc; }

            /* Total */
            .total-section {
              display: flex;
              justify-content: flex-end;
              margin-bottom: 24px;
            }
            .total-box {
              background: #00c8d4;
              color: #fff;
              padding: 12px 24px;
              border-radius: 8px;
              text-align: right;
            }
            .total-label {
              font-size: 0.75rem;
              text-transform: uppercase;
              letter-spacing: 1px;
              opacity: 0.85;
            }
            .total-amount {
              font-family: 'Rajdhani', sans-serif;
              font-size: 1.5rem;
              font-weight: 700;
              letter-spacing: 0.5px;
            }

            /* Estado */
            .estado-section {
              display: flex;
              align-items: center;
              gap: 10px;
              background: #f0fdf4;
              border: 1px solid #86efac;
              border-left: 4px solid #22c55e;
              border-radius: 8px;
              padding: 12px 16px;
              margin-bottom: 24px;
            }
            .estado-icon { font-size: 1.2rem; }
            .estado-text {
              font-weight: 600;
              color: #166534;
              font-size: 0.9rem;
            }

            /* Footer */
            .footer {
              border-top: 1px solid #e2e8f0;
              padding-top: 16px;
              text-align: center;
              font-size: 0.75rem;
              color: #999;
              line-height: 1.6;
            }
            .footer strong { color: #00c8d4; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="header-left">
              <img src="${logo}" class="logo" alt="NeonByte" />
              <div>
                <div class="brand-name">NeonByte</div>
                <div class="brand-sub">Componentes gamer de alto rendimiento</div>
              </div>
            </div>
            <div class="header-right">
              <div class="comprobante-title">Comprobante de Compra</div>
              <div class="orden-code">${codigoPago}</div>
            </div>
          </div>

          <div class="info-section">
            <div class="info-item">
              <label>Cliente</label>
              <span>${usuario?.nombre || "Usuario Invitado"}</span>
            </div>
            <div class="info-item">
              <label>Fecha y hora</label>
              <span>${fecha}</span>
            </div>
            <div class="info-item">
              <label>Método de pago</label>
              <span>Confirmado</span>
            </div>
            <div class="info-item">
              <label>Código de orden</label>
              <span>${codigoPago}</span>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="text-align:left">Producto</th>
                <th style="text-align:center">Cant.</th>
                <th style="text-align:right">Precio unit.</th>
                <th style="text-align:right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>

          <div class="total-section">
            <div class="total-box">
              <div class="total-label">Total pagado</div>
              <div class="total-amount">$${total.toFixed(2)}</div>
            </div>
          </div>

          <div class="estado-section">
            <span class="estado-icon">✅</span>
            <span class="estado-text">Pago aprobado — Tu pedido está siendo procesado</span>
          </div>

          <div class="footer">
            Gracias por tu compra en <strong>NeonByte</strong> — soporte@neonbyte.com<br/>
            Envíos a todo el país · Soporte técnico 24/7<br/>
            Este comprobante es válido como constancia de pago
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
              {item.nombre} x {item.cantidad} = ${(item.precio * item.cantidad).toFixed(2)}
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