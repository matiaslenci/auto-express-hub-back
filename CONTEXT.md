# Auto Express Hub — Backend Context

> Este archivo provee contexto completo del proyecto para agentes de IA (Copilot, Antigravity, etc.). Actualizar cuando se agreguen módulos, entidades, endpoints o decisiones de arquitectura relevantes.

---

## Descripción General

**Auto Express Hub** es una API REST para una plataforma de catálogo de vehículos (autos y motos) orientada al mercado argentino. Permite a agencias registrarse, publicar vehículos y gestionar su perfil. Incluye un módulo de analíticas para rastrear vistas y clics de WhatsApp por vehículo.

- **Framework**: NestJS v11 (TypeScript)
- **Base de datos**: PostgreSQL 14 con TypeORM v0.3
- **Package manager**: Bun (el lockfile es `bun.lock`)
- **Containerización**: Docker + Docker Compose
- **Auth**: JWT (passport-jwt), tokens en header `Authorization: Bearer <token>`
- **Puerto de la app**: 3000 (en Docker dev se expone en 3001)
- **Swagger UI**: `http://localhost:3000/api` (solo en `NODE_ENV !== 'production'`)

---

## Estructura de Directorios

```
src/
├── app.module.ts          # Módulo raíz: registra TypeORM, Throttler, módulos de dominio
├── main.ts                # Bootstrap: CORS, Helmet, ValidationPipe, static files, Swagger
│
├── database/              # Capa de base de datos
│   ├── agency.entity.ts          # Entidad Agency (tabla: agencies)
│   ├── vehicle.entity.ts         # Entidad Vehicle (tabla: vehicles)
│   ├── vehicle-analytics.entity.ts # Entidad VehicleAnalytics (tabla: vehicle_analytics)
│   ├── database.module.ts        # DatabaseModule (repositorios TypeORM)
│   ├── data-source.ts            # DataSource standalone para CLI de TypeORM
│   └── migrations/               # Archivos de migración generados
│
├── auth/                  # Módulo de autenticación
│   ├── auth.controller.ts         # POST /auth/register, POST /auth/login
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts            # Estrategia JWT (valida token, inyecta agency en request)
│   ├── jwt-auth.guard.ts          # Guard estándar JWT
│   ├── admin.guard.ts             # Guard para rutas exclusivas de admin (isAdmin: true)
│   ├── get-user.decorator.ts      # Decorador @GetUser() para extraer agency del request
│   └── dto/
│
├── agencies/              # Módulo de agencias
│   ├── agencies.controller.ts     # GET /agencies/:username, PATCH /agencies/profile
│   ├── agencies.service.ts
│   ├── agencies.module.ts
│   └── dto/
│
├── vehicles/              # Módulo de vehículos
│   ├── vehicles.controller.ts     # CRUD completo + tracking de vistas/whatsapp
│   ├── vehicles.service.ts
│   ├── vehicles.module.ts
│   └── dto/
│
├── uploads/               # Módulo de subida de imágenes
│   ├── uploads.controller.ts      # POST /uploads, DELETE /uploads/:filename
│   ├── uploads.service.ts         # Procesamiento con Sharp (conversión a .webp)
│   ├── uploads.module.ts
│   └── file-upload.config.ts      # Configuración de Multer
│
├── analytics/             # Módulo de analíticas
│   ├── analytics.controller.ts    # GET /analytics/... (panel para agencias)
│   ├── analytics.service.ts
│   └── analytics.module.ts
│
└── admin/                 # Módulo de administración (solo admins)
    ├── admin.controller.ts
    ├── admin.service.ts
    ├── admin.module.ts
    └── dto/
```

---

## Entidades y Schema de Base de Datos

### `agencies` — Entidad `Agency`

| Campo               | Tipo         | Notas                                              |
|---------------------|--------------|----------------------------------------------------|
| `id`                | UUID (PK)    | Auto-generado                                      |
| `username`          | varchar      | Único, indexado. Usado para URLs públicas           |
| `email`             | varchar      | Único, indexado. Usado para login                   |
| `password`          | varchar      | `select: false` — no se retorna en queries normales |
| `nombre`            | varchar      | Nombre visible de la agencia                        |
| `logo`              | varchar?     | URL de logo                                         |
| `portada`           | varchar?     | URL de imagen de portada                            |
| `ubicacion`         | varchar?     | Dirección/ciudad                                    |
| `whatsapp`          | varchar?     | Número de WhatsApp                                  |
| `plan`              | enum         | `gratuito` \| `basico` \| `profesional` \| `premium` |
| `limitePublicaciones` | integer    | Default: 10. `-1` = sin límite                      |
| `isAdmin`           | boolean      | Default: false. Acceso al AdminModule               |
| `isActive`          | boolean      | Default: true. Indica si la agencia está activa      |
| `createdAt`         | timestamptz  |                                                     |
| `updatedAt`         | timestamptz  |                                                     |

**Planes y límites** (`PLAN_LIMITS`):
- `gratuito`: 3 publicaciones
- `basico`: 10 publicaciones
- `profesional`: 50 publicaciones
- `premium`: sin límite (-1)

### `vehicles` — Entidad `Vehicle`

| Campo          | Tipo          | Notas                                       |
|----------------|---------------|---------------------------------------------|
| `id`           | UUID (PK)     | Auto-generado                               |
| `marca`        | varchar       | Ej: Toyota, Ford                            |
| `tipoVehiculo` | enum          | `AUTO` \| `MOTO`                            |
| `modelo`       | varchar       | Ej: Corolla                                 |
| `anio`         | integer       |                                             |
| `precio`       | decimal(10,2)?| Nullable                                    |
| `moneda`       | enum          | `ARS` \| `USD` \| `CONSULTAR`               |
| `tipo`         | varchar       | Ej: Sedán, SUV                              |
| `transmision`  | varchar       | Ej: Automática, Manual                      |
| `combustible`  | varchar       | Ej: Gasolina, Diesel, Eléctrico             |
| `kilometraje`  | integer       |                                             |
| `color`        | varchar       |                                             |
| `descripcion`  | text?         | Nullable                                    |
| `localidad`    | varchar?      | Ciudad/provincia donde está el vehículo     |
| `fotos`        | text[]        | Array de nombres de archivo `.webp`         |
| `activo`       | boolean       | Default: true                               |
| `vistas`       | integer       | Default: 0                                  |
| `clicksWhatsapp` | integer     | Default: 0                                  |
| `agencyId`     | UUID (FK)     | FK → `agencies.id`, CASCADE DELETE          |
| `createdAt`    | timestamptz   |                                             |

### `vehicle_analytics` — Entidad `VehicleAnalytics`

| Campo       | Tipo     | Notas                                             |
|-------------|----------|---------------------------------------------------|
| `vehicleId` | UUID (PK)| FK → `vehicles.id`, CASCADE DELETE                |
| `date`      | date (PK)| Clave compuesta con vehicleId                      |
| `viewsCount` | integer | Default: 0                                        |
| `clicksCount` | integer| Default: 0                                        |

Índice único compuesto en `(vehicleId, date)`.

---

## Endpoints de la API

### Autenticación — `/auth`

| Método | Ruta             | Auth | Descripción                           |
|--------|------------------|------|---------------------------------------|
| POST   | `/auth/register` | No   | Registra una nueva agencia            |
| POST   | `/auth/login`    | No   | Login, retorna JWT token              |

### Agencias — `/agencies`

| Método | Ruta                  | Auth | Descripción                            |
|--------|-----------------------|------|----------------------------------------|
| GET    | `/agencies/:username` | No   | Perfil público de una agencia          |
| PATCH  | `/agencies/profile`   | Sí   | Actualiza perfil de la agencia autenticada |

### Vehículos — `/vehicles`

| Método | Ruta                       | Auth | Descripción                           |
|--------|----------------------------|------|---------------------------------------|
| POST   | `/vehicles`                | Sí   | Crear publicación de vehículo         |
| GET    | `/vehicles`                | No   | Listar vehículos (con filtros)        |
| GET    | `/vehicles/:id`            | No   | Detalle de un vehículo                |
| PATCH  | `/vehicles/:id`            | Sí   | Actualizar vehículo (solo su dueño)   |
| DELETE | `/vehicles/:id`            | Sí   | Eliminar vehículo (solo su dueño)     |
| POST   | `/vehicles/:id/view`       | No   | Registrar una vista                   |
| POST   | `/vehicles/:id/whatsapp`   | No   | Registrar clic en WhatsApp            |

### Uploads — `/uploads`

| Método | Ruta                    | Auth | Descripción                                |
|--------|-------------------------|------|--------------------------------------------|
| POST   | `/uploads`              | Sí   | Subir imagen(es), se convierten a `.webp`  |
| DELETE | `/uploads/:filename`    | Sí   | Eliminar imagen                            |

Las imágenes se sirven como archivos estáticos en `/uploads/<filename>`.

### Analytics — `/analytics`

| Método | Ruta           | Auth | Descripción                                |
|--------|----------------|------|--------------------------------------------|
| GET    | `/analytics/…` | Sí   | Estadísticas de vistas/clics para la agencia |

### Admin — `/admin`

| Método | Ruta       | Auth + Admin | Descripción              |
|--------|------------|--------------|--------------------------|
| *      | `/admin/…` | Sí + isAdmin | Gestión de agencias, etc.|

---

## Configuración y Variables de Entorno

Archivo de referencia: `.env.template`

```env
DB_HOST=           # Host de PostgreSQL
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=       # Contraseña de la BD
DB_DATABASE=auto-express-hub
JWT_SECRET=        # Secreto para firmar JWT
JWT_EXPIRES_IN=14d
CORS_ORIGINS=      # Lista de orígenes permitidos separados por coma
NODE_ENV=production
PORT=3000
BASE_URL=https://api.catalogovehiculos.com
```

---

## Configuración de TypeORM y Migraciones

- `synchronize: false` en producción — **nunca usar `synchronize: true` en prod**
- `migrationsRun: true` — las migraciones se ejecutan automáticamente al iniciar la app
- Archivos de migración en: `src/database/migrations/`
- DataSource standalone para la CLI: `src/database/data-source.ts`

### Scripts de Migración

```bash
# Generar migración a partir de cambios en entidades
bun run migration:generate

# Ejecutar migraciones pendientes (desarrollo)
bun run migration:run

# Revertir última migración
bun run migration:revert

# Ejecutar migraciones en producción (sobre dist compilado)
bun run migration:run:prod
```

---

## Seguridad Implementada

- **Helmet**: headers de seguridad HTTP (`crossOriginResourcePolicy: 'cross-origin'` para servir imágenes cross-domain)
- **CORS**: orígenes configurados por variable de entorno `CORS_ORIGINS`
- **Rate Limiting**: ThrottlerModule — 60 requests por minuto por IP
- **ValidationPipe**: `whitelist: true`, `forbidNonWhitelisted: true` — DTOs estrictos
- **JWT**: tokens con expiración configurable (`JWT_EXPIRES_IN`)
- **Contraseñas**: hasheadas con bcrypt
- **Docker**: proceso corre como usuario `node` (non-root)
- **Admin Guard**: rutas de admin protegidas por `isAdmin` en el token JWT
- **`password` con `select: false`**: nunca expuesto en respuestas

---

## Docker

- **Dockerfile**: multi-stage build (builder con Bun → imagen final con Node 20 Alpine)
- **docker-compose.yml**: desarrollo local con `bun run start:dev` y volumen de uploads
- **docker-compose.prod.yml**: configuración para producción

```bash
# Desarrollo con Docker
docker compose up

# Producción
docker compose -f docker-compose.prod.yml up -d
```

---

## Convenciones y Decisiones de Arquitectura

1. **Idioma de campos en BD**: español (marca, modelo, anio, precio, etc.) dado el contexto del mercado argentino
2. **Imágenes**: se almacenan como archivos `.webp` locales en `./uploads/`. Los nombres de archivo (UUIDs) se guardan en el campo `fotos: text[]` del vehículo
3. **Analíticas**: el modelo `VehicleAnalytics` agrega vistas y clics por día para evitar crecer indefinidamente con un registro por evento
4. **Plan limit enforcement**: el servicio de vehículos verifica `limitePublicaciones` antes de crear una nueva publicación
5. **TypeScript strict**: el proyecto usa TypeScript estricto; siempre tipar correctamente
6. **DTOs**: toda entrada de datos pasa por DTOs con `class-validator`. No se aceptan propiedades extra
7. **Entidades en `app.module.ts`**: las 3 entidades (`Agency`, `Vehicle`, `VehicleAnalytics`) están registradas explícitamente en la configuración de TypeORM
8. **Swagger solo en dev**: la documentación no se expone en producción

---

## Estado Actual del Proyecto

- ✅ Auth con JWT funcional
- ✅ CRUD de vehículos con ownership checks
- ✅ Subida y procesamiento de imágenes (Sharp → webp)
- ✅ Analíticas de vistas y clics por día
- ✅ Panel de admin
- ✅ Migraciones TypeORM configuradas para producción
- ✅ Docker multi-stage con usuario non-root
- ✅ Rate limiting y seguridad HTTP

---

*Última actualización: Junio 2026*
