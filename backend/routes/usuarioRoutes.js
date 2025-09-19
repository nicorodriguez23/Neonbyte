const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { verifyToken, verifyAdmin } = require("../middlewares/auth");


router.post("/register", usuarioController.registrarUsuario);
router.post("/login", usuarioController.loginUsuario);


router.get("/perfil", verifyToken, usuarioController.obtenerPerfil);


router.get("/", verifyToken, verifyAdmin, usuarioController.obtenerUsuarios);
router.post("/", verifyToken, verifyAdmin, usuarioController.registrarUsuario);
router.put("/:id", verifyToken, verifyAdmin, usuarioController.actualizarUsuario);
router.delete("/:id", verifyToken, verifyAdmin, usuarioController.eliminarUsuario);

module.exports = router;
