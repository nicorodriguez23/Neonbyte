const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const { verifyToken, verifyAdmin } = require("../middlewares/auth");
const uploadProducto = require("../middlewares/uploadProducto");

// ─── Rutas públicas ────────────────────────────────────────────────────────────
router.get("/", productoController.obtenerProductos);
router.get("/:id", productoController.obtenerProductoPorId);

// ─── Rutas admin ───────────────────────────────────────────────────────────────
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  uploadProducto.single("imagen"),
  productoController.crearProducto
);

router.put(
  "/cargar-especificaciones",
  verifyToken,
  verifyAdmin,
  productoController.cargarEspecificaciones
);

router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  uploadProducto.single("imagen"),
  productoController.actualizarProducto
);

router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  productoController.eliminarProducto
);

module.exports = router;
