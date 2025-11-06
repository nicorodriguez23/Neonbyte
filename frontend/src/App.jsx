"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer";


import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import Register from "./pages/Register";
import Acerca from "./pages/Acerca";
import Login from "./pages/Login";
import Carrito from "./pages/Carrito";

import DetalleProducto from "./pages/DetallesProductos/DetalleProducto";
import CrearOrden from "./pages/crearOrden";
import Pago from "./pages/Pago.jsx";

import AdminProductos from "./pages/AdminProductos";
import AdminUsuarios from "./pages/AdminUsuarios";

import "./styles/global.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuario]);

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <BrowserRouter>
      <Header />

      <Navbar
        carrito={carrito}
        setCarrito={setCarrito}
        usuario={usuario}
        cerrarSesion={cerrarSesion}
      />

      {/* Rutas */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              carrito={carrito}
              setCarrito={setCarrito}
              usuario={usuario}
            />
          }
        />

        <Route path="/contacto" element={<Contacto />} />
        <Route path="/register" element={<Register />} />
        <Route path="/acerca" element={<Acerca />} />

        <Route
          path="/admin-productos"
          element={
            <AdminProductos carrito={carrito} setCarrito={setCarrito} />
          }
        />
        <Route path="/admin-usuarios" element={<AdminUsuarios />} />

        <Route
          path="/producto/:id"
          element={
            <DetalleProducto
              carrito={carrito}
              setCarrito={setCarrito}
            />
          }
        />

        <Route
          path="/carrito"
          element={
            <Carrito carrito={carrito} setCarrito={setCarrito} />
          }
        />

        <Route
          path="/crear-orden"
          element={
            <CrearOrden
              carrito={carrito}
              setCarrito={setCarrito}
              usuario={usuario}
            />
          }
        />

        <Route
          path="/pago"
          element={
            <Pago
              carrito={carrito}
              total={total}
              usuario={usuario}
              setCarrito={setCarrito}
            />
          }
        />

        <Route
          path="/login"
          element={<Login setUsuario={setUsuario} />}
        />
      </Routes>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
