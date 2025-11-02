const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Configuración recomendada de CORS para desarrollo local
app.use(cors({
  origin: 'http://localhost:5173', // Cambia por la URL de tu frontend si es necesario
  credentials: true
}));

app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB correctamente");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error);
  });

// Ruta raíz (opcional)
app.get("/", (req, res) => {
  res.send("¡Bienvenido al backend de Neonbyte");
});

// Rutas del backend
const usuarioRoutes = require("./routes/usuarioRoutes");
const productoRoutes = require("./routes/productoRoutes");
const ordenRoutes = require("./routes/ordenRoutes");

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ordenes", ordenRoutes);