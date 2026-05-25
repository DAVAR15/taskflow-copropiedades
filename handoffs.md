# Handoffs - Sprint Autonomo TaskFlow

## Handoff ultra compacto

Estado: app funcional en Vanilla JS + Firebase. El foco tecnico es reducir acoplamiento en `public/app.js` sin cambiar el stack.

Ultimo analisis: `app.js` mezcla Firebase, estado, validacion, render de tabla y handlers globales. El riesgo mas claro esta en `loadTasks()`, que usa `innerHTML` y `onclick` inline con datos de usuario.

Siguiente accion recomendada: iniciar o simular el ciclo Ralph con issue `#12`, creando constantes y validaciones compartidas para tareas. Despues continuar con `#13` y `#14`.

No hacer: migrar a framework, cambiar modelo de datos Firestore o redisenar toda la UI.

## Decisiones arquitectonicas consolidadas

- Se mantiene Vanilla JS porque el tamano del proyecto no justifica un framework.
- Se mantiene Firebase Firestore como backend y persistencia offline.
- La modularizacion debe ser progresiva dentro de `public/js/`.
- `app.js` debe evolucionar hacia un orquestador de pantalla, no desaparecer de golpe.
- Las reglas de dominio deben vivir fuera de los handlers DOM.
- Los datos de usuario deben renderizarse con `textContent` cuando sea posible.
- Los commits autonomos deben ser pequenos, con QA humano posterior.

## Pendientes del sprint

- Crear `taskModel.js` con prioridades, estados y validacion basica.
- Extraer repositorios para tareas y propiedades.
- Reemplazar botones con `onclick` inline por listeners asociados al DOM.
- Documentar pruebas manuales minimas por commit.
- Revisar si el requisito de autenticacion Google del `client-brief.md` sigue pendiente o queda fuera del sprint actual.
- Mantener `ralph-simulation-log.md` actualizado con los commits trazables del flujo simulado.

## Handoff por issue

### #12

Objetivo: centralizar constantes y validaciones de tareas.

Contexto necesario: los valores de prioridad y estado aparecen en HTML, CSS y JS. Evitar cambiar nombres porque las clases CSS dependen de ellos.

QA minimo: crear tarea con titulo vacio, sin propiedad y con valores validos.

### #13

Objetivo: extraer operaciones Firestore.

Contexto necesario: preservar `onSnapshot`, `where("property", "==", property)` y `orderBy("createdAt", "desc")`. Puede requerir indice compuesto en Firebase.

QA minimo: cargar propiedades, cambiar propiedad activa y confirmar que se cancela la suscripcion anterior.

### #14

Objetivo: separar renderizado de tabla.

Contexto necesario: mantener comportamiento responsive basado en `data-label`.

QA minimo: probar en ancho desktop y movil, editar titulo con apostrofe y descripcion vacia.

### #15

Objetivo: documentar QA humano y narrativa de sprint.

Contexto necesario: no simular pruebas automatizadas inexistentes. Registrar pruebas manuales y limitaciones.

QA minimo: validar que la documentacion coincide con los commits e issues.
