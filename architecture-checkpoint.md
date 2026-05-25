# Architecture Checkpoint - TaskFlow Copropiedades

Fecha: 24 mayo de 2026
Contexto: auditoria para simular un sprint autonomo asistido por IA sobre el proyecto existente.

## Diagnostico breve

TaskFlow es una SPA pequena en Vanilla JS, HTML y CSS, desplegable en Firebase Hosting. La arquitectura actual es funcional para un MVP: `public/index.html` define la estructura, `public/style.css` concentra la presentacion responsive y `public/app.js` contiene integracion Firebase, estado de pantalla, renderizado y handlers de usuario.

El principal punto de acoplamiento es `public/app.js`: en un solo archivo se inicializa Firebase, se escuchan colecciones Firestore, se validan entradas, se construye HTML de filas, se exponen funciones globales para botones inline y se administra el modal de edicion. Esto no impide el funcionamiento, pero reduce la legibilidad y aumenta el riesgo de regresiones al agregar autenticacion, filtros o reglas de validacion.

## Hallazgos por area

- Estructura de carpetas: el proyecto usa una estructura plana (`public/`, `issues/`, archivos Firebase). Es adecuada para el tamaño actual, pero ya necesita una separacion minima dentro de `public/js/` si se agregan mas flujos.
- Firebase: la configuracion e inicializacion viven en `public/app.js`. Las operaciones `addDoc`, `updateDoc`, `deleteDoc` y `onSnapshot` estan mezcladas con UI. Esto dificulta probar la logica de datos sin DOM.
- Renderizado UI: `loadTasks()` arma filas con `innerHTML` y `onclick` inline. Es rapido para el MVP, pero acopla datos, eventos, escape manual de strings y clases CSS.
- Estado: `activeProperty`, `unsubscribe` y `currentEditId` son variables globales de modulo. El estado es pequeno, pero no esta documentado como contrato.
- Validaciones: hay validacion minima para titulo y propiedad. No hay normalizacion centralizada de titulo, descripcion, prioridad o estado.
- Seguridad de UI: interpolar datos de Firestore en `innerHTML` puede abrir riesgo de HTML no deseado si un titulo o descripcion contiene markup. Para sprint corto, conviene migrar el render de filas a `createElement`/`textContent`.
- CSS: `public/style.css` es mas grande que `app.js`, pero esta organizado por secciones. No requiere modularizacion inmediata; bastaria revisar consistencia visual si se cambian componentes.

## Componente mas problematico

El componente mas problematico es la gestion de tareas dentro de `public/app.js`, especialmente `loadTasks()` y los handlers globales relacionados. Alli confluyen:

- consulta Firestore filtrada por propiedad,
- renderizado de tabla,
- calculo de clases visuales,
- acciones de editar, cambiar estado y eliminar,
- escape manual de datos para `onclick`.

## Tres oportunidades de deepening

1. Extraer una capa pequena de repositorio Firebase.

Objetivo: mover operaciones de datos a `public/js/taskRepository.js` y `public/js/propertyRepository.js`.

Resultado esperado: `app.js` deja de conocer detalles repetidos de colecciones y documentos. No se introduce framework ni bundler.

2. Separar renderizado de tareas y eventos de accion.

Objetivo: crear una funcion `renderTaskRow(task, handlers)` o `createTaskRow(task)` que use nodos DOM y `textContent`.

Resultado esperado: menos `innerHTML`, menos funciones en `window`, menor riesgo al mostrar datos editables por usuario.

3. Centralizar constantes y validaciones del dominio.

Objetivo: definir prioridades, estados y validadores en un modulo simple como `public/js/taskModel.js`.

Resultado esperado: los valores `"baja"`, `"media"`, `"alta"`, `"por empezar"`, `"en curso"` y `"finalizado"` dejan de estar dispersos. Los formularios de crear y editar comparten reglas.

## Simulacion de subagentes arquitectonicos

### Subagente A - Repository-first

Interfaz propuesta:

```js
export function subscribeTasksByProperty(property, onChange, onError) {}
export function createTask(input) {}
export function updateTask(id, patch) {}
export function removeTask(id) {}
```

Estrategia: extraer primero Firestore a modulos de repositorio. `app.js` conservaria renderizado y estado UI.

Ventajas: cambio pequeno, reversible, facil de justificar. Reduce acoplamiento con Firebase sin tocar demasiada UI.

Desventajas: no resuelve por completo el `innerHTML` ni los handlers globales.

### Subagente B - UI Renderer-first

Interfaz propuesta:

```js
export function renderTaskList(container, tasks, actions) {}
export function renderEmptyState(container, message) {}
export function bindTaskActions(container, actions) {}
```

Estrategia: extraer primero la tabla y reemplazar `onclick` inline por listeners.

Ventajas: ataca el mayor riesgo de legibilidad y seguridad de UI. Mejora el codigo visible para QA.

Desventajas: requiere tocar el flujo mas sensible de la pantalla; puede generar regresiones si no se prueba manualmente.

### Subagente C - Domain Model-first

Interfaz propuesta:

```js
export const TASK_STATUSES = ["por empezar", "en curso", "finalizado"];
export const TASK_PRIORITIES = ["baja", "media", "alta"];
export function normalizeTaskInput(formValues) {}
export function validateTaskInput(task) {}
```

Estrategia: formalizar primero reglas de negocio y validaciones compartidas.

Ventajas: muy bajo riesgo. Prepara autenticacion, filtros y pruebas unitarias futuras.

Desventajas: por si sola no reduce mucho el tamano de `app.js`.

## Recomendacion hibrida final

Para este sprint corto, la mejor ruta es incremental:

1. Crear `taskModel.js` con constantes y validaciones.
2. Extraer operaciones Firestore a repositorios pequeños.
3. Refactorizar `loadTasks()` para usar un renderer DOM sin `onclick` inline.

Esta secuencia evita una reescritura completa, mantiene compatibilidad con Firebase Hosting y permite commits pequeños revisables por QA humano.

## Checkpoint de decision

Decision aceptada: mantener Vanilla JS y Firebase CDN por ahora.

Razon: el proyecto es pequeño y funcional. Introducir React, Vite o una arquitectura por capas completa aumentaria el alcance sin necesidad inmediata.

Riesgo aceptado: mientras `app.js` siga concentrando la pantalla, cualquier cambio debe probar creacion, edicion, cambio de estado, eliminacion y cambio de propiedad.

Proximo checkpoint: despues de extraer repositorios y renderer, medir si `app.js` queda como orquestador de menos de 120 lineas.
