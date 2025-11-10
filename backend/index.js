const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://neonbyte-one.vercel.app",
];

const vercelRegex = /\.vercel\.app$/;

app.use(
  cors({
    origin: (origin, callback) => {
      
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) || vercelRegex.test(new URL(origin).hostname);

      if (isAllowed) return callback(null, true);
      return callback(new Error(`CORS bloqueado: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.options("*", cors());

app.use(express.json());


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
  res.send("¡Bienvenido al backend de Neonbyte!");
});

const usuarioRoutes = require("./routes/usuarioRoutes");
const productoRoutes = require("./routes/productoRoutes");
const ordenRoutes = require("./routes/ordenRoutes");

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ordenes", ordenRoutes);
