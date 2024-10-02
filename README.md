# devJobs [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)[![Netlify Status](https://api.netlify.com/api/v1/badges/b6605ef0-438b-4f66-825d-6f6a000e696f/deploy-status)](https://app.netlify.com/sites/hiinit-web-terminal/deploys)

![B0DEAD90-0842-47F4-BBFB-6024B7AD066A_4_5005_c](https://github.com/user-attachments/assets/d586c007-2dd7-42cf-bb45-7c1f387b8d14)

devJobs es una aplicación web creada para conectar desarrolladores y reclutadores a través de un portal de trabajo especializado en vacantes tecnológicas.

- Producción: **PENDIENTE**

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [API](#api)
- [Testing](#testing)
- [Licencia](#licencia)

## Descripción

devJobs es un portal de trabajo enfocado en desarrolladores y reclutadores. Los reclutadores pueden publicar, editar y eliminar ofertas de trabajo, así como gestionar candidatos y revisar sus currículums. Los candidatos pueden buscar ofertas de empleo, aplicar a ellas y enviar su información directamente a los reclutadores.

El sistema también cuenta con funcionalidades de autenticación para asegurar que solo los usuarios autorizados puedan acceder a ciertos paneles de administración.

## Características

- **Publicación de ofertas de empleo**: Los reclutadores pueden listar vacantes con detalles como tecnología (React, Angular, etc.), ubicación, salario y descripción.
- **Aplicación a vacantes**: Los candidatos pueden aplicar a las vacantes enviando sus datos y currículum.
- **Panel de administración para reclutadores**: Permite a los reclutadores gestionar sus vacantes, editar sus datos, y revisar los currículums de los candidatos.
- **Buscador de ofertas**: En la página principal, los candidatos pueden filtrar ofertas por palabras clave.
- **Autenticación y autorización**: Los usuarios pueden registrarse, iniciar sesión, y acceder a funcionalidades según su rol.
- **Gestión de contraseñas**: Implementada con bcrypt para encriptación segura.
- **Subida de archivos**: Los candidatos pueden subir su currículum a través de multer.
- **Validación de datos**: Validación de campos de entrada con validator.

## Tecnologías

### Frontend

- **Vite**: Entorno de desarrollo rápido.
- **React**: Framework de JavaScript para la creación de interfaces de usuario.
- **react-router-dom**: Navegación entre rutas seguras y coherentes.
- **sweetalert2**: Alertas y notificaciones interactivas.

### Backend

- **NodeJS**: Entorno de ejecución para JavaScript del lado del servidor.
- **Express**: Framework minimalista para la creación de APIs.
- **JWT**: Autenticación mediante JSON Web Tokens.
- **bcrypt**: Encriptación de contraseñas.
- **multer**: Subida de archivos en local.
- **validator**: Validación de entradas de usuario.
- **mocha/chai**: Librerías para testing y pruebas unitarias.

### Base de Datos

- **MongoDB**: Base de datos no relacional para almacenar información de usuarios, vacantes y aplicaciones.

## Instalación

### Requisitos

- **Node.js** >= 14.x
- **MongoDB** instalado localmente o acceso a una instancia en la nube.

### Pasos

1. Clona el repositorio:

```bash
git clone https://github.com/tuusuario/devJobs.git

```

2. Instala las dependencias del backend:

```bash
cd api
npm install
```

3. Instala las dependencias del frontend:

```bash
cd ../app
npm install
```

4. Crea un archivo .env en el directorio backend con las siguientes variables de entorno:

```bash
MONGO_URI=tu_mongo_uri
JWT_SECRET=tu_jwt_secret
```

5. Ejecuta la aplicación en modo desarrollo:

```bash
cd api
node .
```

6. En otra terminal, ejecuta el frontend:

```bash
cd ../app
npm run dev
```

### Uso

1. Los reclutadores pueden registrarse y crear vacantes desde el panel de administración.
2. Los candidatos pueden buscar y filtrar vacantes en la página principal, además de aplicar a ellas enviando sus datos y currículum.
3. Los reclutadores pueden gestionar sus vacantes y ver la lista de candidatos desde su panel.

### API

La API provee varios endpoints para manejar la autenticación, las vacantes y los usuarios. Algunos ejemplos de endpoints son:

- `POST /users/auth`: Iniciar sesión.
- `POST /users/create`: Registrar un nuevo usuario.
- `GET /offers`: Obtener la lista de vacantes.
- `POST /offers/create`: Crear una nueva vacante (solo reclutadores).
- `PUT /offers/edit/:offerUrl`: Editar una vacante (solo reclutadores).
- `DELETE /offer/:offerUrl`: Eliminar una vacante (solo reclutadores).

### Testing

Se han implementado pruebas unitarias para garantizar la fiabilidad del sistema. Utilizamos las siguientes librerías para testing:

- **Mocha**: Framework para la ejecución de pruebas.
- **Chai**: Librería para realizar aserciones.

Para ejecutar las pruebas:

```bash
cd backend
npm run test

```
