Portafolio Profesional Full Stack
Este repositorio contiene el código fuente de mi portafolio profesional personal. Es una aplicación web Full Stack diseñada para demostrar habilidades en desarrollo moderno, conectando una interfaz reactiva con una API RESTful y una base de datos relacional.

El proyecto permite la gestión y visualización dinámica de proyectos destacados, extrayendo la información en tiempo real desde una base de datos alojada en la nube.

Demo en Vivo
Puedes visitar la versión desplegada del proyecto en el siguiente enlace:

[https://portafolio-profesional-eosin.vercel.app]

Tecnologías Utilizadas
Este proyecto fue construido utilizando una arquitectura separada (Cliente-Servidor) con las siguientes tecnologías:

Frontend
React: Biblioteca principal para la interfaz de usuario.
Vite: Entorno de desarrollo y empaquetador para una construcción optimizada.
Tailwind CSS: Framework de utilidades para el diseño responsivo y estilizado.
JavaScript (ES6+): Lógica del lado del cliente.

Backend
Node.js: Entorno de ejecución para el servidor.
Express.js: Framework para la creación de la API REST.
PostgreSQL: Base de datos relacional para almacenar la información de los proyectos.
pg (node-postgres): Cliente para conectar Node.js con PostgreSQL.

Infraestructura y Despliegue
Vercel: Alojamiento del Frontend.

Render: Alojamiento del Backend y la Base de Datos PostgreSQL.

Git & GitHub: Control de versiones.

Características del Proyecto
Arquitectura Full Stack: Separación clara entre el cliente (carpeta client) y el servidor (raíz del proyecto).
Carga Dinámica: Los proyectos mostrados en el portafolio no están "hardcoded" (escritos a mano en el código), sino que se consultan a la base de datos a través de endpoints de la API.
Diseño Responsivo: La interfaz se adapta a dispositivos móviles, tablets y computadoras de escritorio.
Gestión de Errores: Manejo de fallos en la conexión con la base de datos o en la carga de imágenes.
Seguridad: Uso de variables de entorno para proteger credenciales sensibles tanto en desarrollo local como en producción.

Instalación y Configuración Local
Si deseas ejecutar este proyecto en tu entorno local, sigue estos pasos:

1. Clonar el repositorio

git clone https://github.com/davidsalomon07/portafolio-profesional.git
cd portafolio-profesional
2. Configurar el Backend (Servidor)
Instala las dependencias necesarias en la raíz del proyecto:


npm install
Crea un archivo .env en la raíz del proyecto y configura las siguientes variables con tus credenciales locales de PostgreSQL:

Fragmento de código

DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_NAME=portfolio_local
DB_PORT=5432
Inicia el servidor de desarrollo:


npm start
El servidor debería correr en http://localhost:3000

3. Configurar el Frontend (Cliente)
Navega a la carpeta del cliente e instala las dependencias:


cd client
npm install
Crea un archivo .env dentro de la carpeta client para conectar con tu backend local:

Fragmento de código

VITE_API_URL=http://localhost:3000
Inicia la aplicación de React:


npm run dev
La aplicación debería estar disponible en http://localhost:5173

Estructura del Proyecto
El proyecto sigue una estructura organizada para facilitar el mantenimiento:

/client: Contiene todo el código fuente del Frontend (React).
/src/components: Componentes reutilizables de la UI.
/src/hooks: Lógica personalizada (Custom Hooks).
/src: Contiene el código fuente del Backend (Node.js).
/routes: Definición de las rutas de la API.
/controllers: Lógica de negocio y consultas a la base de datos.
index.js: Punto de entrada del servidor.
database.sql: Script de referencia para la creación de tablas.

Contacto
Si tienes alguna pregunta sobre el código o deseas contactarme:

GitHub: davidsalomon07


Email: [ldsalomon@puce.edu.ec]
