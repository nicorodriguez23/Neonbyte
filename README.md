# 🖥️ NeonByte

NeonByte es un **e-commerce futurista de componentes gamer** desarrollado como proyecto full stack para practicar y demostrar habilidades de desarrollo web moderno.

---

## 🚀 Tecnologías utilizadas

**Frontend:**
- React con Vite (SPA rápida y modular)
- React Router DOM (navegación entre páginas)
- Axios (consumo de API)
- Bootstrap + CSS personalizado (diseño responsive y UI moderna)
- SweetAlert2 (notificaciones y alertas)
- LocalStorage (persistencia de sesión y carrito)

**Backend:**
- Node.js + Express (servidor y API REST)
- MongoDB Atlas (base de datos en la nube)
- Mongoose (modelado de datos)
- JWT (autenticación con token)
- Multer (subida y gestión de imágenes de productos)
- Bcrypt (encriptación de contraseñas)

**Infraestructura:**
- Render (deploy del backend)
- Git & GitHub (control de versiones y repositorio)

---

## ✨ Características principales

- 🛍️ **Catálogo de productos gamer**: listado dinámico con detalles, especificaciones e imágenes.
- 🛒 **Carrito de compras interactivo**: agregar, eliminar, ver cantidad de productos y subtotal.
- 💳 **Proceso de compra**: creación de órdenes y comprobante de pago.
- 👤 **Gestión de usuarios**: registro, login, roles (admin/cliente) y sesión persistente.
- 🛠️ **Panel de administración**:
  - CRUD de productos (crear, editar, eliminar con imágenes)
  - CRUD de usuarios (crear, editar, eliminar)
  - Gestión de órdenes de compra
- 📱 **Responsive**: se adapta a móviles, tablets y desktop.

---

## ⚡ Flujo de trabajo

1. El usuario navega y agrega productos al carrito.
2. Puede registrarse o iniciar sesión (JWT para autenticación).
3. Procede a crear la orden de compra (los datos se envían al backend).
4. Visualiza un comprobante de pago con todos sus datos y productos.
5. Si es admin, accede a paneles para gestionar productos, usuarios y órdenes.

---

## 🔐 Seguridad y buenas prácticas

- Autenticación con JWT y roles para proteger rutas de administración.
- Contraseñas encriptadas con bcrypt.
- Validaciones en frontend y backend para inputs y formularios.
- Subida segura de imágenes de productos con Multer.

---

## 🛠️ Instalación y ejecución local

```bash
# Clonar repositorio
git clone https://github.com/tuusuario/neonbyte.git

# Instalar dependencias frontend
cd integrador-frontend
npm install
npm run dev

# Instalar dependencias backend
cd ../integrador-backend
npm install
npm run dev
