# 🔒 Cambios de Seguridad — Auto Express Hub Backend

**Fecha:** 22/02/2026  
**Autor:** Auditoría automática

---

## Resumen

Se corrigieron **13 vulnerabilidades de seguridad** organizadas por severidad. A continuación se detallan todos los cambios realizados, archivos modificados, y los cambios que el **frontend necesita implementar**.

---

## Archivos Modificados

| Archivo | Cambio |
|---------|--------|
| `src/agencies/dto/update-agency.dto.ts` | Removidos `plan` y `limitePublicaciones` |
| `src/agencies/agencies.service.ts` | Removida lógica de sincronización de plan |
| `src/uploads/uploads.service.ts` | Sanitización contra path traversal |
| `src/database/agency.entity.ts` | `select: false` en columna password |
| `src/main.ts` | CORS restringido, Swagger condicional, ValidationPipe con whitelist |
| `src/app.module.ts` | ThrottlerModule, synchronize condicional |
| `src/auth/auth.module.ts` | JWT expiresIn corregido |
| `src/auth/dto/create-agency.dto.ts` | Política de contraseñas reforzada |
| `src/vehicles/vehicles.controller.ts` | Rate limiting en view/whatsapp |
| `docker-compose.prod.yml` | Credenciales externalizadas, puerto DB removido |
| `.env` | JWT_SECRET placeholder, CORS_ORIGINS agregado |

---

## Detalle de Cambios

### 1. 🔴 Escalación de Plan (CRÍTICO)

**Problema:** Cualquier usuario podía cambiar su plan a `PREMIUM` via `PATCH /agencies/profile`.

**Solución:**
- Removidos `plan` y `limitePublicaciones` de `UpdateAgencyDto`
- Agregado `whitelist: true` y `forbidNonWhitelisted: true` a `ValidationPipe` para rechazar propiedades no declaradas en el DTO
- Removida la lógica de sincronización de plan en `agencies.service.ts`

### 2. 🔴 JWT Secret Débil

**Problema:** El secreto era `yourSecretKey` en `.env` y `docker-compose.prod.yml`.

**Solución:** Placeholder en `.env` que recuerda cambiar el valor. Variables externalizadas en docker-compose.

### 3. 🔴 Credenciales DB Hardcodeadas

**Problema:** `docker-compose.prod.yml` tenía password `admin` en texto plano.

**Solución:** Todas las credenciales usan variables de entorno `${VARIABLE}`.

### 4. 🔴 Path Traversal en Eliminación de Archivos

**Problema:** El parámetro `filename` en `DELETE /uploads/:folder/:filename` no se sanitizaba.

**Solución:** Validación de `..`, `/`, `\` en filename. Verificación con `path.resolve()` que el archivo esté dentro del directorio de uploads.

### 5. 🟠 CORS Abierto

**Problema:** `app.enableCors()` sin opciones aceptaba cualquier origen.

**Solución:** Orígenes configurables via variable de entorno `CORS_ORIGINS` (separados por coma).

### 6. 🟠 `synchronize: true` en TypeORM

**Problema:** Podía causar pérdida de datos en producción al modificar el schema automáticamente.

**Solución:** `synchronize` desactivado cuando `NODE_ENV=production`.

### 7. 🟠 Swagger Expuesto en Producción

**Problema:** La documentación de la API estaba disponible en `/api` para cualquiera.

**Solución:** Swagger solo se activa cuando `NODE_ENV !== 'production'`.

### 8. 🟠 Sin Rate Limiting

**Problema:** Endpoints `POST /vehicles/:id/view` y `POST /vehicles/:id/whatsapp` sin protección contra abuso.

**Solución:** Instalado `@nestjs/throttler`. Rate limit global de 60 req/min, y 5 req/min específico para view/whatsapp.

### 9. 🟡 Bug en JWT Expiry

**Problema:** `parseInt('3600s')` funcionaba por coincidencia, pero `parseInt('1h')` devolvería `1`.

**Solución:** Usa valor numérico (segundos) directamente desde config.

### 10. 🟡 Password Expuesto en Queries

**Problema:** La columna `password` se incluía en todas las queries por defecto.

**Solución:** `select: false` en la entity. Solo se carga cuando se solicita explícitamente con `select: ['password']`.

### 11. 🟡 Puerto PostgreSQL Expuesto

**Problema:** Puerto 5432 mapeado al host en `docker-compose.prod.yml`.

**Solución:** Mapeo de puerto removido. La DB solo es accesible internamente via la red Docker.

### 12. 🟡 Política de Contraseñas Débil

**Problema:** Solo requería 8 caracteres mínimo.

**Solución:** Ahora requiere: mayúscula + minúscula + número + carácter especial (`@$!%*?&`).

### 13. 🟡 ValidationPipe sin Whitelist

**Problema:** Propiedades no declaradas en los DTOs se pasaban al servicio sin filtrar.

**Solución:** `whitelist: true` (elimina propiedades desconocidas) + `forbidNonWhitelisted: true` (devuelve error 400).

---

## ⚠️ Cambios Requeridos en el Frontend

> **IMPORTANTE:** Los siguientes cambios son necesarios para que el frontend siga funcionando correctamente con el backend actualizado.

### 1. Validación de contraseña en el registro

La política de contraseñas cambió. El formulario de registro debe validar:

```
Mínimo 8 caracteres
Al menos 1 mayúscula
Al menos 1 minúscula  
Al menos 1 número
Al menos 1 carácter especial (@$!%*?&)
```

**Regex para validar en frontend:**
```typescript
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
```

**Mensaje sugerido:**
> "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)"

### 2. No enviar `plan` ni `limitePublicaciones` en perfil

Si el frontend envía `plan` o `limitePublicaciones` en el `PATCH /agencies/profile`, ahora recibirá un **error 400** (Bad Request).

**Acción:** Verificar que el formulario de edición de perfil **NO envíe** estos campos. Si existe un selector de plan en el perfil, debe ser removido o deshabilitado (solo un admin debería poder cambiarlo).

### 3. No enviar propiedades extra en ningún endpoint

`ValidationPipe` ahora rechaza propiedades no declaradas en los DTOs. Si el frontend envía campos extras (por ejemplo, un campo `id` en el body de creación), recibirá un **error 400**.

**Acción:** Revisar todos los requests que se hacen a la API y asegurarse de enviar **solo** las propiedades que cada endpoint espera.

### 4. Swagger no disponible en producción

Si se usaba `/api` para probar la API en producción, ya no estará disponible.

**Acción:** Usar el Swagger local en desarrollo (`http://localhost:3000/api`).

---

## Variables de Entorno Nuevas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `CORS_ORIGINS` | Orígenes permitidos para CORS (separados por `,`) | `https://midominio.com,https://admin.midominio.com` |
| `NODE_ENV` | Entorno de ejecución | `production` |

## Acción Manual para Producción

Generar un JWT secret seguro:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Configurar las siguientes variables en el servidor de producción:

```env
JWT_SECRET=<el_hash_generado_arriba>
DB_PASSWORD=<contraseña_segura_de_postgres>
CORS_ORIGINS=https://tu-dominio-frontend.com
NODE_ENV=production
```
