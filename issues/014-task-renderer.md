# #14 - Separar renderizado de filas de tareas y acciones

## Descripcion

La funcion `loadTasks()` construye filas con `innerHTML` y botones con `onclick` inline. Esto acopla datos, HTML, eventos y escape manual de strings en un mismo bloque. Se propone mover el render a una funcion dedicada con listeners DOM.

## Blocked by

#12, #13

## Objetivo tecnico

Reducir riesgo de HTML no deseado y mejorar legibilidad del renderizado de tareas.

## Alcance sugerido

- Crear `public/js/taskRenderer.js`.
- Renderizar titulo y descripcion con `textContent`.
- Mantener clases CSS existentes.
- Mantener atributos `data-label` para responsive.
- Pasar acciones como callbacks: editar, cambiar estado y eliminar.

## Commit recomendado

```text
refactor(#14): define task renderer deepening slice
```

## Fix posible asociado

```text
fix(#14): preserve mobile data labels after task row refactor
```
