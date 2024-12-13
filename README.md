# FitFusion Backend

Backend para la aplicación FitFusion, desarrollado en TypeScript con una arquitectura hexagonal que aplica principios de **Domain-Driven Design (DDD)** y **Vertical Slicing**. El backend está diseñado para ser escalable, mantenible y modular, utilizando **Express.js** como framework HTTP y **JWT** para la gestión de autenticación, incluyendo soporte para inicio de sesión mediante Google.

## Características Principales

- **TypeScript**: Código estrictamente tipado para mayor confiabilidad y escalabilidad.
- **Arquitectura Hexagonal**: Organización del código en capas bien definidas (Dominio, Aplicación, Infraestructura, Presentación).
- **DDD**: Implementación basada en dominios específicos de negocio.
- **Vertical Slicing**: Separación modular por funcionalidad para un desarrollo más ágil.
- **JWT**: Autenticación basada en tokens para garantizar seguridad.
- **Google OAuth**: Inicio de sesión mediante Google para usuarios.
- **MongoDB Atlas**: Base de datos en la nube para almacenamiento de datos.

## Requisitos

- **Node.js** >= 18
- **TypeScript** >= 5
- **MongoDB Atlas**
- **Google Cloud API** habilitada para autenticación OAuth (sin necesidad de tarjeta si es en entorno local).

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/usuario/fitfusion-backend.git
   cd fitfusion-backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno creando un archivo `.env` basado en `.env.example`:

   ```env
   PORT=4000
   JWT_SECRET=tu_secreto_jwt
   MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/fitfusion
   GOOGLE_CLIENT_ID=tu_cliente_id_google
   GOOGLE_CLIENT_SECRET=tu_secreto_google
   GOOGLE_REDIRECT_URI=http://localhost:4000/auth/google/callback
   ```

4. Compila el proyecto:

   ```bash
   npm run build
   ```

5. Inicia el servidor:
   ```bash
   npm start
   ```

El servidor estará disponible en [http://localhost:4000](http://localhost:4000).

## Scripts Disponibles

- **`npm run dev`**: Ejecuta el proyecto en modo de desarrollo con recarga en caliente.
- **`npm run build`**: Transpila el código TypeScript a JavaScript en la carpeta `dist`.
- **`npm start`**: Ejecuta el proyecto desde la carpeta `dist`.
- **`npm run lint`**: Ejecuta ESLint para comprobar problemas en el código.
- **`npm test`**: Ejecuta pruebas unitarias.

## Estructura del Proyecto

```plaintext
src/
├── auth
│   ├── application
│   │   ├── dtos
│   │   │   ├── authenticate_user_dto.ts
│   │   │   └── register_user_dto.ts
│   │   └── use_cases
│   │       ├── AuthenticateUserUseCase.ts
│   │       ├── index.ts
│   │       └── RegisterUserUseCase.ts
│   ├── domain
│   │   ├── entities
│   │   │   ├── index.ts
│   │   │   └── user.ts
│   │   ├── errors
│   │   │   ├── index.ts
│   │   │   ├── InvalidCredentialsError.ts
│   │   │   ├── UserAlreadyExistsError.ts
│   │   │   ├── UserError.ts
│   │   │   └── UserNotFoundError.ts
│   │   ├── index.ts
│   │   ├── repositories
│   │   │   ├── index.ts
│   │   │   └── user_repository.ts
│   │   └── value_objects
│   │       ├── email.ts
│   │       ├── index.ts
│   │       ├── password.ts
│   │       └── userRole.ts
│   ├── infraestructure
│   │   ├── database
│   │   │   ├── models
│   │   │   │   └── userModel.ts
│   │   │   └── user_repository.ts
│   │   └── passport
│   │       └── googleStratety.ts
│   ├── middlewares
│   │   └── authMiddleware.ts
│   ├── presentation
│   │   ├── controllers
│   │   │   └── userController.ts
│   │   └── routes
│   │       └── authRoutes.ts
│   ├── services
│   │   ├── authService.ts
│   │   └── jwtService.ts
│   └── types
│       └── customRecuest.ts
├── stadistics
│   ├── application
│   │   ├── dtos
│   │   │   ├── get_user_stats_dto.ts
│   │   │   └── update_user_stats_dto.ts
│   │   └── use_cases
│   │       ├── GetUserStatsUseCase.ts
│   │       └── UpdateUserStatsUseCase.ts
│   ├── domain
│   │   ├── entities
│   │   │   └── userStats.ts
│   │   ├── errors
│   │   ├── repositories
│   │   │   └── userStatsRepository.ts
│   │   └── value_objects
│   │       └── stats.ts
│   ├── infraestructure
│   │   └── database
│   │       ├── models
│   │       │   └── userStatsModel.ts
│   │       └── mongoStatsRepository.ts
│   ├── presentation
│   │   ├── controllers
│   │   │   └── userStatsController.ts
│   │   └── routes
│   │       └── userStatsRoutes.ts
│   └── service
│       └── UserStatsService.ts
├── server.ts
└── tests
    └── auth
        ├── integration
        └── unit
            └── authService.test.ts
```

### Autenticación

- **Aplicación**: Contiene los casos de uso relacionados con registro e inicio de sesión mediante credenciales propias o Google. Utiliza DTOs como `authenticate_user_dto` y `register_user_dto` para manejar la transferencia de datos.
- **Dominio**: Incluye la entidad `User`, repositorios para interactuar con la base de datos y objetos de valor como `email` y `password`.
- **Infraestructura**: Maneja la conexión con MongoDB mediante `userModel` y estrategias de autenticación con Passport, incluyendo `googleStratety`.
- **Presentación**: Controladores y rutas como `authRoutes` para manejar las solicitudes HTTP relacionadas con autenticación.

### Estadísticas

- **Aplicación**: Define los casos de uso como `GetUserStatsUseCase` y `UpdateUserStatsUseCase`, además de los DTOs necesarios para las operaciones estadísticas.
- **Dominio**: Modela las estadísticas de usuario en la entidad `userStats` y utiliza objetos de valor como `stats` para estructurar datos.
- **Infraestructura**: Proporciona implementación para interactuar con MongoDB a través de `userStatsModel` y `mongoStatsRepository`.
- **Presentación**: Ofrece controladores como `userStatsController` y rutas como `userStatsRoutes` para gestionar las estadísticas de los usuarios.

### Dominio General

- **Entidades**: Representan conceptos centrales del negocio como `User` y `userStats`.
- **Repositorios**: Interfases que abstraen las operaciones CRUD con la base de datos.
- **Errores**: Manejo centralizado de errores como `UserNotFoundError` y `InvalidCredentialsError`.

## Endpoints Principales

### Autenticación

- **POST /auth/register**: Registra un nuevo usuario.
- **POST /auth/login**: Autenticación con credenciales propias.
- **GET /auth/google**: Redirige al flujo de inicio de sesión de Google.
- **GET /auth/google/callback**: Callback para manejar la autenticación de Google.

### Estadísticas

- **GET /stats**: Obtiene las estadísticas del usuario autenticado.
- **PUT /stats**: Actualiza las estadísticas del usuario.

### Usuario

- **GET /users/profile**: Devuelve la información del usuario autenticado.
- **PUT /users/profile**: Actualiza el perfil del usuario.

## Seguridad

1. **JWT**: Los usuarios reciben un token JWT al iniciar sesión, que se incluye en cada solicitud como una cookie segura.
2. **Google OAuth**: El flujo de autenticación es manejado con **Passport.js**, proporcionando inicio de sesión seguro con Google.
3. **Validación**: Middlewares para proteger rutas y validar tokens.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más información.

---
