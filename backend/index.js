const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

const ALLOW_LIST = new Set([
  "http://localhost:5173",
  "http://localhost:3000",
  "https://neonbyte-one.vercel.app",
]);
const VERCEL_SUBDOMAIN = /\.vercel\.app$/i;

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); 
      try {
        const { host, protocol } = new URL(origin);
        if (ALLOW_LIST.has(origin)) return cb(null, true);
        if (VERCEL_SUBDOMAIN.test(host) && (protocol === "https:" || protocol === "http:")) {
          return cb(null, true);
        }
      } catch (_) {}
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/health", (_req, res) => res.status(200).send("ok"));

const usuarioRoutes = require("./routes/usuarioRoutes");
const productoRoutes = require("./routes/productoRoutes");
const ordenRoutes   = require("./routes/ordenRoutes");

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ordenes",  ordenRoutes);

app.get("/", (_req, res) => {
  res.send("¡Bienvenido al backend de Neonbyte!");
});

(async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("Falta la variable de entorno MONGO_URI");
    }

    await mongoose.connect(mongoUri, { dbName: process.env.MONGO_DB || "integrador" });

    console.log("✅ Conectado a MongoDB correctamente");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error al conectar a MongoDB:", err);
    process.exit(1); 
  }
})();

app.use((err, _req, res, _next) => {
  if (err?.message?.includes("CORS")) {
    return res.status(401).json({ error: "CORS: origen no permitido" });
  }
  return res.status(500).json({ error: "Error de servidor" });
});
