# NeonByte

NeonByte es un e-commerce de componentes gamer desarrollado con el stack **MERN**.  
El proyecto combina funcionalidad completa con una estética moderna y futurista, inspirada en el mundo del hardware y la tecnología.

---

## Descripción general

El sitio permite a los usuarios navegar por un catálogo de productos, agregar artículos al carrito, realizar pedidos y registrarse con autenticación segura mediante JWT.  
Incluye además un panel de administración para gestionar productos y usuarios, lo que lo convierte en un sistema de comercio electrónico completo y funcional.

El diseño fue pensado para mantener una identidad visual coherente con el concepto de “energía y tecnología”, utilizando tonos oscuros y acentos cian, junto con un estilo limpio, responsivo y de buena experiencia de usuario.

---

## Tecnologías utilizadas

### Frontend
- **React** con **Vite** para un entorno rápido y modular.
- **React Router DOM** para la navegación entre páginas.
- **Axios** para la comunicación con el backend.
- **Bootstrap** y **CSS personalizado** para el diseño visual.
- Manejo de **estado y persistencia** de carrito mediante localStorage.

### Backend
- **Node.js + Express** como base del servidor.
- **MongoDB Atlas + Mongoose** para la base de datos.
- **JWT (JSON Web Token)** para autenticación y roles.
- **Multer** para la carga de imágenes.
- **Bcrypt** para el encriptado de contraseñas.

---

## Funcionalidades principales

- Registro y login de usuarios con verificación por token.  
- Carrito de compras persistente en `localStorage`.  
- Creación y visualización de órdenes de compra.  
- Panel de administración con CRUD completo de productos y usuarios.  
- Subida de imágenes y asignación de rutas locales o remotas.  
- Validaciones de formulario y manejo de errores.  
- Diseño totalmente responsive, adaptable a cualquier dispositivo.

---

## Estructura del proyecto

/frontend
├── src/
│ ├── components/
│ ├── pages/
│ ├── styles/
│ ├── services/
│ └── assets/
└── vite.config.js

/backend
├── controllers/
├── models/
├── routes/
├── middlewares/
├── server.js
└── .env



---

## Instalación y ejecución local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/nicorodriguez23/neonbyte.git


2. instalar dependencias:
   cd neonbyte/backend
   npm install
   cd ../frontend
   npm install

3. configurar variables de entorno en el archivo .env:
    MONGO_URI=tu_conexion_mongodb
    JWT_SECRET=tu_clave

4. Levantar el backend:
   cd backend
   npm run dev o node index.js

5.  Levantar el frontend
    cd../frontend
    npm run dev   




NeonByte fue desarrollado como un proyecto integrador para poner en práctica todo lo aprendido en el área de desarrollo web full stack.
Además de su objetivo académico, representa un punto de partida para futuros proyectos orientados al comercio electrónico, con foco en la experiencia de usuario y la escalabilidad.

