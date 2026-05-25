# #12 - Centralizar constantes y validaciones de tareas

## Descripcion

Actualmente las prioridades, estados y validaciones minimas estan dispersas entre `public/index.html`, `public/style.css` y `public/app.js`. El objetivo es crear un modulo pequeno con reglas de dominio para reducir valores magicos y preparar refactors posteriores.

## Blocked by

Ninguno.

## Objetivo tecnico

Crear una fuente clara para prioridades, estados, normalizacion de entradas y validacion basica de tareas, manteniendo compatibilidad con la UI actual.

## Alcance sugerido

- Crear `public/js/taskModel.js`.
- Definir prioridades permitidas.
- Definir estados permitidos.
- Agregar `normalizeTaskInput()`.
- Agregar `validateTaskInput()`.
- Usar el validador en creacion y edicion de tareas.

## Commit recomendado

```text
feat(#12): define task domain validation slice
```
