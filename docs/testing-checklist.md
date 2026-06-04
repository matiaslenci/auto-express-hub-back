# 🧪 Testing Checklist — Auto Express Hub Backend

> Checklist de testing manual módulo por módulo. Usar con Postman, cURL o Swagger UI (`http://localhost:3000/api`).
>
> **Convención**: Marcar `[x]` cuando el test pase, `[!]` si falla (agregar nota del error).

---

## Pre-requisitos

- [ ] La app se levanta sin errores (`bun run start:dev` o `docker compose up`)
- [ ] PostgreSQL está corriendo y accesible
- [ ] Las migraciones se ejecutaron correctamente al iniciar
- [ ] Swagger UI accesible en `http://localhost:3000/api`

---

## Módulo 1: Auth (`/auth`)

### 1.1 Registro — `POST /auth/register`

**Happy path:**
- [x] Registrar agencia con datos válidos → 201 + `{ access_token, agency }`
- [x] El `access_token` es un JWT válido
- [x] El objeto `agency` NO incluye el campo `password`
- [x] El `plan` por defecto es `gratuito` si no se envía

**Validaciones del DTO:**
- [x] Sin `nombre` → 400 con mensaje "El nombre es obligatorio"
- [x] Sin `username` → 400 con mensaje "El nombre de usuario es obligatorio"
- [x] Sin `email` → 400 con mensaje "El email es obligatorio"
- [x] Email inválido (ej: `"noesemail"`) → 400 con mensaje "El email debe ser un correo válido"
- [x] Sin `password` → 400 con mensaje "La contraseña es obligatoria"
- [x] Password < 8 caracteres (ej: `"Ab1@"`) → 400
- [x] Password sin mayúscula (ej: `"password1@"`) → 400
- [x] Password sin minúscula (ej: `"PASSWORD1@"`) → 400
- [x] Password sin número (ej: `"Password@abc"`) → 400
- [x] Password sin carácter especial (ej: `"Password123"`) → 400
- [x] Password válida (ej: `"Securep@ss123"`) → 201
- [x] Plan inválido (ej: `"plan": "inexistente"`) → 400
- [x] Enviar campo extra no permitido (ej: `"hack": true`) → 400 (forbidNonWhitelisted)

**Conflictos:**
- [x] Registrar con `username` ya existente → 409 "El nombre de usuario o correo electrónico ya existe"
- [x] Registrar con `email` ya existente → 409

---

### 1.2 Login — `POST /auth/login`

**Happy path:**
- [x] Login con email y password correctos → 200 + `{ access_token, agency }`
- [x] El objeto `agency` NO incluye el campo `password`
- [x] El token JWT funciona en endpoints protegidos

**Errores:**
- [x] Email no registrado → 401 "Credenciales inválidas"
- [x] Password incorrecta → 401 "Credenciales inválidas"
- [x] Sin `email` → 400
- [x] Sin `password` → 400
- [x] Email con formato inválido → 400

**Seguridad:**
- [x] El mensaje de error NO revela si el email existe o no (mismo mensaje para ambos casos)

---

## Módulo 2: Agencies (`/agencies`)

### 2.1 Perfil público — `GET /agencies/:username`

**Happy path:**
- [ ] Con `username` existente → 200 + datos de la agencia
- [ ] El campo `password` NO está presente en la respuesta

**Errores:**
- [ ] Con `username` inexistente → 404

---

### 2.2 Actualizar perfil — `PATCH /agencies/profile`

**Happy path:**
- [ ] Con token válido + datos parciales → 200 + agencia actualizada
- [ ] Actualizar `nombre` → se refleja
- [ ] Actualizar `ubicacion` → se refleja
- [ ] Actualizar `whatsapp` → se refleja
- [ ] Actualizar `logo` → se refleja
- [ ] Actualizar `portada` → se refleja

**Auth:**
- [ ] Sin token → 401
- [ ] Con token expirado → 401
- [ ] Con token inválido/corrupto → 401

**Validaciones:**
- [ ] Enviar campo no permitido (ej: `"plan": "premium"`) → 400

---

## Módulo 3: Vehicles (`/vehicles`)

### 3.1 Crear vehículo — `POST /vehicles`

**Happy path:**
- [ ] Con token válido + todos los campos obligatorios → 201 + vehículo creado
- [ ] El `agencyId` se asigna automáticamente al usuario autenticado
- [ ] Campos opcionales (`precio`, `descripcion`, `localidad`, `activo`) pueden omitirse
- [ ] `moneda: "CONSULTAR"` sin `precio` → 201
- [ ] `tipoVehiculo: "AUTO"` → 201
- [ ] `tipoVehiculo: "MOTO"` → 201

**Validaciones del DTO:**
- [ ] Sin `marca` → 400
- [ ] Sin `modelo` → 400
- [ ] Sin `anio` → 400
- [ ] `anio` como string → 400
- [ ] Sin `moneda` → 400
- [ ] `moneda` inválida (ej: `"EUR"`) → 400
- [ ] `tipoVehiculo` inválido → 400
- [ ] Sin `tipo` → 400
- [ ] Sin `transmision` → 400
- [ ] Sin `combustible` → 400
- [ ] Sin `kilometraje` → 400
- [ ] `kilometraje` como string → 400
- [ ] Sin `color` → 400
- [ ] Sin `fotos` → 400
- [ ] `fotos` no es array → 400
- [ ] Enviar más de 20 fotos → 400 "Un vehículo no puede tener más de 20 fotos"

**Límite de publicaciones por plan:**
- [ ] Agencia con plan `gratuito` → puede crear hasta 3 vehículos
- [ ] Al intentar crear el 4to vehículo → 403 con mensaje del límite
- [ ] Agencia con plan `premium` → puede crear sin límite

**Auth:**
- [ ] Sin token → 401

**Normalización de fotos:**
- [ ] Enviar URL completa en fotos (ej: `"https://domain.com/uploads/vehicles/abc.webp"`) → se guarda solo `"abc.webp"`

---

### 3.2 Listar vehículos — `GET /vehicles`

**Happy path:**
- [ ] Sin filtro → 200 + todos los vehículos
- [ ] Con `?agencyId=<uuid>` → solo vehículos de esa agencia
- [ ] Array vacío si no hay resultados → 200 + `[]`

---

### 3.3 Mis vehículos — `GET /vehicles/my-vehicles`

**Happy path:**
- [ ] Con token válido → 200 + solo los vehículos del usuario autenticado

**Auth:**
- [ ] Sin token → 401

---

### 3.4 Vehículos por username — `GET /vehicles/user/:username`

**Happy path:**
- [ ] Con `username` existente → 200 + vehículos de esa agencia
- [ ] Con `username` sin vehículos → 200 + `[]`

---

### 3.5 Detalle de vehículo — `GET /vehicles/:id`

**Happy path:**
- [ ] Con UUID válido existente → 200 + datos del vehículo

**Errores:**
- [ ] UUID inexistente → 404 "Vehículo con ID ... no encontrado"
- [ ] ID con formato no-UUID → 400 (ParseUUIDPipe)

---

### 3.6 Actualizar vehículo — `PATCH /vehicles/:id`

**Happy path:**
- [ ] Con token del dueño + campos a actualizar → 200 + vehículo actualizado
- [ ] Actualización parcial funciona (enviar solo `marca` por ejemplo)
- [ ] Al quitar fotos del array, las imágenes removidas se eliminan del disco

**Ownership:**
- [ ] Intentar editar vehículo de OTRA agencia → 401 "Solo puedes editar tus propios vehículos"

**Validaciones:**
- [ ] UUID inválido → 400
- [ ] UUID inexistente → 404
- [ ] Más de 20 fotos → 400

**Auth:**
- [ ] Sin token → 401

---

### 3.7 Eliminar vehículo — `DELETE /vehicles/:id`

**Happy path:**
- [ ] Con token del dueño → 204 (sin body)
- [ ] Las fotos del vehículo se eliminan del disco

**Ownership:**
- [ ] Intentar eliminar vehículo de OTRA agencia → 401

**Errores:**
- [ ] UUID inexistente → 404
- [ ] UUID inválido → 400

**Auth:**
- [ ] Sin token → 401

---

### 3.8 Tracking de vistas — `POST /vehicles/:id/view`

**Happy path:**
- [ ] Con UUID existente → 200 + vehículo con `vistas` incrementado

**Rate limiting:**
- [ ] Más de 5 requests en 60 seg desde la misma IP → 429 Too Many Requests

**Errores:**
- [ ] UUID inexistente → 404

---

### 3.9 Tracking de WhatsApp — `POST /vehicles/:id/whatsapp`

**Happy path:**
- [ ] Con UUID existente → 200 + vehículo con `clicksWhatsapp` incrementado

**Rate limiting:**
- [ ] Más de 5 requests en 60 seg desde la misma IP → 429

**Errores:**
- [ ] UUID inexistente → 404

---

## Módulo 4: Uploads (`/uploads`)

### 4.1 Subir imagen de vehículo — `POST /uploads/vehicle-image`

**Happy path:**
- [ ] Con token + imagen válida (.jpg, .png, .webp) → 201 + `{ filename: "uuid.webp" }`
- [ ] La imagen se convierte a `.webp`
- [ ] La imagen se guarda en `uploads/vehicles/`
- [ ] La imagen es accesible en `GET /uploads/vehicles/<filename>`

**Validaciones:**
- [ ] Archivo > 10MB → 400
- [ ] Archivo no-imagen (ej: .txt, .pdf) → 400
- [ ] Sin archivo adjunto → 400

**Auth:**
- [ ] Sin token → 401

---

### 4.2 Subir logo de agencia — `POST /uploads/agency-logo`

**Happy path:**
- [ ] Con token + imagen válida → 201 + `{ filename }`
- [ ] Se guarda en `uploads/agencies/`

**Validaciones:**
- [ ] Archivo > 10MB → 400
- [ ] Archivo no-imagen → 400

**Auth:**
- [ ] Sin token → 401

---

### 4.3 Subir portada de agencia — `POST /uploads/agency-cover`

**Happy path:**
- [ ] Con token + imagen válida → 201 + `{ filename }`
- [ ] Se guarda en `uploads/agencies/`

**Validaciones:**
- [ ] Archivo > 10MB → 400
- [ ] Archivo no-imagen → 400

**Auth:**
- [ ] Sin token → 401

---

### 4.4 Eliminar imagen — `DELETE /uploads/:folder/:filename`

**Happy path:**
- [ ] Con token + `folder=vehicles` + filename existente → 200 "Image deleted successfully"
- [ ] Con token + `folder=agencies` + filename existente → 200

**Validaciones:**
- [ ] Folder inválido (ej: `"other"`) → 400 "Carpeta no válida"
- [ ] Filename inexistente → 404

**Auth:**
- [ ] Sin token → 401

---

### 4.5 Limpieza de archivos huérfanos — `POST /uploads/cleanup`

**Happy path:**
- [ ] Con token de admin → 200 + `{ deleted: [...], count: N }`

**Auth:**
- [ ] Sin token → 401
- [ ] Con token de usuario NO admin → 403

---

### 4.6 Archivos estáticos — `GET /uploads/:folder/:filename`

- [ ] Imagen existente en `vehicles/` → 200 + imagen servida
- [ ] Imagen existente en `agencies/` → 200 + imagen servida
- [ ] Imagen inexistente → 404
- [ ] Header `Cross-Origin-Resource-Policy: cross-origin` presente (Helmet)

---

## Módulo 5: Analytics (`/analytics`)

### 5.1 Registrar vista — `POST /analytics/vehicle/:id/view`

**Happy path:**
- [ ] Con UUID existente → 200
- [ ] Se crea/actualiza registro en `vehicle_analytics` para la fecha de hoy

**Rate limiting:**
- [ ] Más de 5 requests en 60 seg → 429

**Errores:**
- [ ] UUID inválido → 400
- [ ] UUID inexistente → verificar comportamiento

---

### 5.2 Registrar clic WhatsApp — `POST /analytics/vehicle/:id/whatsapp-click`

**Happy path:**
- [ ] Con UUID existente → 200
- [ ] Se incrementa `clicksCount` en `vehicle_analytics`

**Rate limiting:**
- [ ] Más de 5 requests en 60 seg → 429

---

### 5.3 Resumen de agencia — `GET /analytics/agency/summary`

**Happy path:**
- [ ] Con token válido → 200 + resumen de analíticas de la agencia

**Auth:**
- [ ] Sin token → 401

---

### 5.4 Stats de un vehículo — `GET /analytics/vehicle/:id/stats`

**Happy path:**
- [ ] Con token + UUID → 200 + stats del vehículo
- [ ] Sin parámetro `days` → usa 30 por defecto
- [ ] Con `?days=7` → retorna stats de los últimos 7 días

**Auth:**
- [ ] Sin token → 401

**Errores:**
- [ ] UUID inválido → 400
- [ ] `days` como string no numérico → 400

---

## Módulo 6: Admin (`/admin`)

> ⚠️ Todos los endpoints requieren JWT + `isAdmin: true`

### 6.1 Listar agencias — `GET /admin/agencies`

**Happy path:**
- [ ] Con token de admin → 200 + lista de todas las agencias (ordenadas por createdAt DESC)

**Auth:**
- [ ] Sin token → 401
- [ ] Con token de usuario normal → 403
- [ ] Con token de admin → 200

---

### 6.2 Cambiar estado de agencia — `PATCH /admin/agencies/:id/status`

**Happy path:**
- [ ] `{ "isActive": false }` → 200 + agencia desactivada
- [ ] `{ "isActive": true }` → 200 + agencia reactivada

**Auth:**
- [ ] Sin token → 401
- [ ] Con token de usuario normal → 403

**Errores:**
- [ ] UUID inexistente → 404
- [ ] UUID inválido → 400

---

### 6.3 Cambiar plan de agencia — `PATCH /admin/agencies/:id/plan`

**Happy path:**
- [ ] `{ "plan": "premium" }` → 200 + agencia con plan actualizado
- [ ] Verificar que el cambio de plan afecta el límite de publicaciones

**Auth:**
- [ ] Sin token → 401
- [ ] Con token de usuario normal → 403

**Errores:**
- [ ] UUID inexistente → 404
- [ ] Plan inválido → 400

---

## Módulo 7: Seguridad General

### 7.1 Headers HTTP (Helmet)

- [ ] `X-Content-Type-Options: nosniff` presente
- [ ] `X-Frame-Options` presente
- [ ] `Cross-Origin-Resource-Policy: cross-origin` presente
- [ ] `Content-Security-Policy` presente

### 7.2 CORS

- [ ] Origen permitido (en `CORS_ORIGINS`) → headers CORS presentes
- [ ] Origen NO permitido → request bloqueado por CORS
- [ ] Métodos permitidos: GET, POST, PATCH, DELETE

### 7.3 Rate Limiting Global

- [ ] ThrottlerModule: 60 requests/minuto por IP
- [ ] Al superar el límite → 429 Too Many Requests

### 7.4 Validación Global

- [ ] Propiedades extra no definidas en DTOs → 400 (forbidNonWhitelisted)
- [ ] Propiedades faltantes requeridas → 400
- [ ] Tipos incorrectos → 400

---

## Notas y Bugs Encontrados

| # | Módulo | Endpoint | Descripción del Bug | Severidad | Estado |
|---|--------|----------|---------------------|-----------|--------|
| 1 |        |          |                     |           |        |

---

*Última actualización: Junio 2026*
