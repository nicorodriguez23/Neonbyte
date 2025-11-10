const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || "integrador";


const allowedOrigins = new Set([
  "http://localhost:5173",
  "https://neonbyte-one.vercel.app",
]);

const vercelRegex = /^https?:\/\/[a-z0-9-]+\.vercel\.app$/i;


app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && (allowedOrigins.has(origin) || vercelRegex.test(origin))) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Vary", "Origin");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (_req, res) => {
  res.send("¡Bienvenido al backend de NeonByte!");
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

const usuarioRoutes = require("./routes/usuarioRoutes");
const productoRoutes = require("./routes/productoRoutes");
const ordenRoutes = require("./routes/ordenRoutes");

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ordenes", ordenRoutes);

mongoose
  .connect(MONGO_URI, { dbName: DB_NAME })
  .then(() => {
    console.log(`✅ Conectado a MongoDB (DB: ${DB_NAME})`);
    app.listen(PORT, () => {
      console.log(`🚀 Server listo en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
    process.exit(1); 
  });
