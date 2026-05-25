# #13 - Aislar acceso a Firestore en repositorios pequenos

## Descripcion

`public/app.js` inicializa Firebase y ejecuta directamente operaciones de lectura y escritura. Esto mezcla infraestructura con UI y dificulta revisar cambios. Se propone extraer funciones de acceso a datos para tareas y propiedades.

## Blocked by

#12

## Objetivo tecnico

Separar operaciones Firestore de la logica de pantalla sin cambiar colecciones, documentos ni comportamiento offline.

## Alcance sugerido

- Crear `public/js/firebaseClient.js`.
- Crear `public/js/taskRepository.js`.
- Crear `public/js/propertyRepository.js`.
- Mantener `enableIndexedDbPersistence(db)`.
- Exponer funciones especificas, no repositorios genericos.

## Commit recomendado

```text
refactor(#13): define firestore repository extraction
```
