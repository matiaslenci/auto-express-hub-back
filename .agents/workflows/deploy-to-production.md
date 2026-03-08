---
description: Deploy changes to production (with or without DB schema changes)
---

## Caso A: Solo cambios de lógica (sin tocar entidades)

Estos son cambios en servicios, controladores, DTOs sin nuevas columnas, etc.

1. Hacer los cambios en el código
2. Commitearlo y pushearlo al repositorio
3. En el servidor de producción, hacer redeploy del contenedor (el Dockerfile ya corre las migraciones automaticamente al iniciar, aunque no haya ninguna pendiente)

```bash
git add .
git commit -m "feat: descripción del cambio"
git push
```

---

## Caso B: Cambios en entidades (nuevas columnas, tablas, índices, etc.)

Este es el caso cuando modificás archivos `.entity.ts`.

// turbo
1. Con la base de datos **local** corriendo, generar la migración automáticamente:

```bash
npm run migration:generate -- src/database/migrations/NombreDescriptivo
```

// turbo
2. Revisar el archivo generado en `src/database/migrations/` y verificar que el SQL sea correcto.

// turbo
3. Probar la migración localmente:

```bash
npm run migration:run
```

4. Commitear todo (código + archivo de migración) y pushear:

```bash
git add .
git commit -m "feat: descripción del cambio"
git push
```

5. En producción, hacer redeploy del contenedor. Al iniciar, el CMD del Dockerfile ejecuta automáticamente:
```
npx typeorm migration:run -d dist/database/data-source.js
```
Esto aplica la migración pendiente antes de arrancar la app.

---

## Notas importantes

- **Nunca borres archivos de migración** ya aplicados en producción. TypeORM los registra en la tabla `migrations` y sabe cuáles aplicar.
- Si la migración **falla**, la app no arranca (por el `&&` en el CMD). Revisá los logs del contenedor.
- Para revertir la última migración en producción: `npm run migration:revert` (conectado al servidor).
