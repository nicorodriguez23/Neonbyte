const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const allowedList = [
  "http://localhost:5173",
  "https://neonbyte-one.vercel.app",
];

const vercelRegex = /^https?:\/\/([a-z0-9-]+\.)*vercel\.app$/i;

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      if (allowedList.includes(origin) || vercelRegex.test(origin)) {
        return cb(null, true);
      }
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { dbName: "integrador" })
  .then(() => {
    console.log("✅ Conectado a MongoDB correctamente (DB: integrador)");
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("¡Bienvenido al backend de Neonbyte!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const usuarioRoutes = require("./routes/usuarioRoutes");
const productoRoutes = require("./routes/productoRoutes");
const ordenRoutes = require("./routes/ordenRoutes");

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ordenes", ordenRoutes);
app.use((err, req, res, next) => {
  if (err?.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS: origen no permitido" });
  }
  return next(err);
});
