const jwt = require("jsonwebtoken");

/**
 * Verifica que el request tenga un JWT válido en el header Authorization.
 * Si es válido, adjunta el payload en req.usuario y continúa.
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "Token no proporcionado o mal formado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};

/**
 * Verifica que el usuario autenticado tenga rol de administrador.
 * Debe usarse SIEMPRE después de verifyToken.
 */
const verifyAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.rol !== "admin") {
    return res.status(403).json({ mensaje: "Acceso denegado: se requiere rol de administrador" });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };