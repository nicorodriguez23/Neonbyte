const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://neonbyte-one.vercel.app"
  ],
  credentials: true
}));


app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { dbName: "integrador" })
  .then(() => {
    console.log("✅ Conectado a MongoDB correctamente (DB: integrador)");
    app.listen(process.env.PORT || 4000, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${process.env.PORT || 4000}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error);
  });


app.get("/", (req, res) => {
  res.send("¡Bienvenido al backend de Neonbyte");
});


const usuarioRoutes = require("./routes/usuarioRoutes");
const productoRoutes = require("./routes/productoRoutes");
const ordenRoutes = require("./routes/ordenRoutes");

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ordenes", ordenRoutes);