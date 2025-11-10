const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const WHITELIST = [
  "http://localhost:5173",
  "https://neonbyte-one.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const isWhitelisted =
      WHITELIST.includes(origin) || /\.vercel\.app$/.test(origin);

    if (isWhitelisted) return callback(null, true);
    return callback(new Error(`CORS not allowed: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME || "integrador",
  })
  .then(() => {
    console.log("✅ Conectado a MongoDB correctamente (DB:", process.env.DB_NAME || "integrador", ")");
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
  res.send("Bienvenido al backend de NeonByte");
});

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

const usuarioRoutes = require("./routes/usuarioRoutes");
const productoRoutes = require("./routes/productoRoutes");
const ordenRoutes = require("./routes/ordenRoutes");

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ordenes", ordenRoutes);

app.use((err, req, res, next) => {
  if (err?.message?.startsWith("CORS not allowed")) {
    return res.status(403).json({ error: "CORS bloqueado", origin: req.headers.origin });
  }
  next(err);
});
