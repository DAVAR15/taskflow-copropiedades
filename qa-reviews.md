# QA Reviews - Commits Autonomos

## QA posterior a `feat(#12): centralize task domain constants and validation`

Tests ejecutados:

- Revision manual de formulario de creacion con titulo vacio.
- Revision manual de formulario con propiedad no seleccionada.
- Revision manual de prioridades `baja`, `media`, `alta`.
- `npm.cmd test` ejecutado; el proyecto reporta `Error: no test specified`, por lo que no existe suite automatizada activa.

Revision de acoplamiento:

- Mejora esperada: reglas de tarea fuera de handlers DOM.
- Riesgo restante: `index.html` y `style.css` todavia contienen valores relacionados con prioridad.

Revision de legibilidad:

- El commit es aceptable si los nombres del modulo explican reglas de negocio, no detalles visuales.
- Evitar validadores demasiado genericos para no sobredisenar.

Hallazgos menores:

- Agregar mensaje unico de error ayuda, pero no debe cambiar el flujo de `alert()` si el sprint busca bajo riesgo.

Resultado QA: aprobado con observacion menor.

## QA posterior a `refactor(#13): isolate firestore task and property access`

Tests ejecutados:

- Carga inicial de propiedades.
- Cambio entre propiedades.
- Creacion de propiedad nueva.
- Creacion de tarea y aparicion en tiempo real.

Revision de acoplamiento:

- Mejora esperada: `app.js` ya no importa directamente todas las funciones Firestore.
- Riesgo restante: la pantalla sigue dependiendo de la forma exacta de los documentos.

Revision de legibilidad:

- Aprobado si los repositorios son pequenos y no esconden logica UI.
- Rechazar si se crea una abstraccion generica tipo `BaseRepository` innecesaria.

Hallazgos menores:

- Documentar en comentario breve que la consulta por propiedad puede requerir indice compuesto.

Resultado QA: aprobado si no cambia nombres de colecciones.

## QA posterior a `refactor(#14): render task rows with DOM event bindings`

Tests ejecutados:

- Render de lista con tareas.
- Estado vacio de tareas.
- Edicion de tarea con apostrofe en titulo.
- Cambio de estado a `en curso` y `finalizado`.
- Eliminacion cancelada y eliminacion confirmada.

Revision de acoplamiento:

- Mejora esperada: desaparecen `window.editTask`, `window.updateStatus` y `window.deleteTask` o quedan reducidas temporalmente.
- Riesgo restante: renderer puede conocer clases CSS; aceptable para esta escala.

Revision de legibilidad:

- Aprobado si cada accion se pasa como callback claro.
- Revisar que `data-label` siga presente para responsive.

Hallazgos menores:

- Si se mantienen iconos emoji, verificar accesibilidad con `title` o `aria-label`.

Resultado QA: aprobado con prueba manual en movil.

## QA posterior a `docs(#15): add autonomous sprint handoffs and checkpoint`

Tests ejecutados:

- Lectura cruzada de `issues/`, `handoffs.md`, `architecture-checkpoint.md` y `qa-reviews.md`.
- Verificacion de consistencia entre IDs, dependencias y commits sugeridos.

Revision de acoplamiento:

- La documentacion no altera runtime.
- Los entregables reflejan el estado actual sin prometer arquitectura no implementada.

Revision de legibilidad:

- Aprobado si los handoffs permiten retomar trabajo sin releer todo el repo.

Hallazgos menores:

- Mantener fecha y alcance del checkpoint visibles para diferenciar diagnostico de implementacion.

Resultado QA: aprobado.
