# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

PROYECTO FINAL G1 - PLATAFORMA DE NOTICIAS DIGITALES
AUTORAS:
•	Valentina Sanjuan
•	Karen Castillo
INSTITUCIÓN:
Universidad de la Amazonía
Programa: Ingeniería de Sistemas
Asignatura: Programación Web
Año: 2025
DESCRIPCIÓN DEL PROYECTO
Este proyecto corresponde al desarrollo de una plataforma web de noticias digitales, diseñada para permitir la publicación, visualización y gestión de artículos periodísticos por parte de usuarios autenticados según su rol (reportero, editor) y los visitantes, los cuales no requieren de un registro .
El sistema está construido con React y Firebase, implementando una arquitectura moderna, modular y escalable.
Cuenta con rutas públicas y privadas, un sistema de autenticación seguro y un diseño adaptable que ofrece una experiencia fluida tanto para lectores como para administradores de contenido.

ESTRUCTURA DEL PROYECTO


├── ProyectoFinalG1_CastilloKaren_SanjuanValentina/
│
├── node_modules/
├── public/
│   └── vite.svg
│
├── src/
│   ├── assets/
│   │
│   ├── Componentes/
│   │   ├── Context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── Footer/
│   │   │   ├── Footer.css
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── Header/
│   │   │   ├── Header.css
│   │   │   └── Header.jsx
│   │   │
│   │   ├── Main/
│   │   │   ├── Main.css
│   │   │   └── Main.jsx
│   │   │
│   │   ├── NewsList/
│   │   │   └── NewsList.jsx
│   │   │
│   │   └── ProtectedRoute/
│   │       └── ProtectedRoute.jsx
│   │
│   ├── Config/
│   │   └── firebase.js
│   │
│   ├── Pages/
│   │   ├── Contact/
│   │   │   ├── ContactPage.css
│   │   │   └── ContactPage.jsx
│   │   │
│   │   ├── Dashboard/
│   │   │   └── DashboardPage.jsx
│   │   │
│   │   ├── Login/
│   │   │   ├── AuthPages.css
│   │   │   └── LoginPage.jsx
│   │   │
│   │   ├── NewsDetail/
│   │   │   ├── NewsDetailPage.css
│   │   │   └── NewsDetailPage.jsx
│   │   │
│   │   ├── NewsForm/
│   │   │   ├── NewsFormPage.css
│   │   │   └── NewsFormPage.jsx
│   │   │
│   │   ├── NotFound/
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   ├── PanelEditor/
│   │   │   ├── PanelEditor.css
│   │   │   └── PanelEditor.jsx
│   │   │
│   │   ├── PanelReportero/
│   │   │   ├── PanelReportero.css
│   │   │   └── PanelReportero.jsx
│   │   │
│   │   ├── PublicHome/
│   │   │   ├── PublicHomePage.css
│   │   │   └── PublicHomePage.jsx
│   │   │
│   │   ├── Register/
│   │   │   └── RegisterPage.jsx
│   │   │
│   │   └── Unauthorized/
│   │       └── UnauthorizedPage.jsx
│   │
│   ├── Servicios/
│   │   └── newsService.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
PRINCIPALES CARACTERÍSTICAS
•	Visualización de noticias públicas con detalles individuales.
•	Autenticación y registro de usuarios mediante Firebase Authentication.
•	Roles y permisos dinámicos (reportero / editor / administrador).
•	Paneles personalizados según tipo de usuario.
•	Creación, edición y eliminación de artículos.
•	Navegación protegida y mantenida con Context API.
•	Diseño responsive y moderno con CSS y componentes reutilizables.
TECNOLOGÍAS UTILIZADAS
Frontend: React + Vite
Lenguaje: JavaScript (ES6+)
Estilos: CSS3 modularizado
Backend / Base de Datos: Firebase Authentication y Firestore
Enrutamiento: React Router DOM
Control de estado: Context API
Control de versiones: Git / GitHub

AUTENTICACIÓN
•	Registro e inicio de sesión mediante Firebase Authentication.
•	Mantenimiento de sesión activa con onAuthStateChanged.
•	Protección de rutas mediante Context API y ProtectedRoute.
GESTIÓN DE NOTICIAS
•	Creación y edición de artículos desde los paneles de usuario.
•	Eliminación controlada por rol (solo editores/autores).
•	Visualización pública de las noticias disponibles.
NAVEGACIÓN
•	Enrutamiento dinámico con React Router DOM.
•	Redirección automática según rol o permisos.
•	Diseño responsivo y moderno con estilos personalizados.
EJECUCIÓN DEL PROYECTO
1.	Clonar el repositorio
git clone https://github.com/usuario/ProyectoFinalG1.git
2.	Instalar dependencias
npm install
3.	Ejecutar en entorno de desarrollo
npm run dev
4.	Abrir en el navegador
http://localhost:5173

Este proyecto fue desarrollado con fines académicos, aplicando buenas prácticas de desarrollo web moderno, modularización de componentes y manejo seguro de autenticación en entornos frontend conectados a servicios en la nube (Firebase).
