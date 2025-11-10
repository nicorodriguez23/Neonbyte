// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ---- CORS (prod + previews de Vercel + local) ----
const allowed = [
  "http://localhost:5173",
  "https://neonbyte-one.vercel.app",
  /\.vercel\.app$/, // cualquier preview de Vercel
];

app.use(
  cors({
    origin: (origin, callback) => {
      // permitir tools como Postman (sin origin)
      if (!origin) return callback(null, true);

      const ok = allowed.some((rule) =>
        rule instanceof RegExp ? rule.test(origin) : rule === origin
      );
      return ok
        ? callback(null, true)
        : callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// preflight global
app.options("*", cors());

// ---- middlewares comunes ----
app.use(express.json());

// ---- DB ----
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

// ---- healthcheck ----
app.get("/", (req, res) => {
  res.send("Bienvenido al backend de Neonbyte");
});

// ---- rutas ----
const usuarioRoutes = require("./routes/usuarioRoutes");
const productoRoutes = require("./routes/productoRoutes");
const ordenRoutes = require("./routes/ordenRoutes");

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ordenes", ordenRoutes);
