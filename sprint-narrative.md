# Narrativa Tecnica del Sprint Autonomo

## Contexto

El sprint parte de un MVP funcional llamado TaskFlow Copropiedades. La aplicacion permite gestionar tareas asociadas a propiedades usando Vanilla JS, Firebase Firestore y Firebase Hosting. El objetivo del sprint no es reconstruir la app, sino simular un flujo de ingenieria autonoma asistida por IA con entregables verificables, commits pequenos y QA humano posterior.

## Estrategia

La IA actua como ejecutora autonoma de issues de bajo riesgo. El humano conserva el rol de QA, validando que cada commit preserve el comportamiento del MVP. Se priorizan refactors incrementales porque el proyecto ya funciona y porque el alcance universitario favorece claridad sobre arquitectura compleja.

## Flujo simulado

El enunciado menciona ejecucion mediante `./ralph/once.sh`, pero este repositorio no incluye ese runtime. Para mantener la entrega enfocada y verificable, el sprint se representa como una simulacion trazable del Ralph Loop: cada ciclo queda asociado a un issue, un commit con ID, una revision QA y un handoff.

1. Auditoria inicial de `public/app.js`, `public/index.html`, `public/style.css`, Firebase y documentacion existente.
2. Generacion de issues tecnicos con dependencias entre tickets.
3. Simulacion de ejecucion autonoma por commits pequenos.
4. Revision humana despues de cada commit.
5. Checkpoint arquitectonico para decidir si continuar modularizando o cerrar el sprint.
6. Handoff final con decisiones, pendientes y riesgos.

## Resolucion de dependencias entre tickets

`#12` desbloquea validaciones compartidas y reduce valores magicos. `#13` puede ejecutarse despues para aislar Firebase sin cambiar UI. `#14` depende de tener reglas y acciones mas claras, porque toca el renderizado de tabla. `#15` consolida documentacion y QA al final.

## Checkpoints academicos

- Checkpoint 1: confirmar que el problema real es acoplamiento en `app.js`, no falta de framework.
- Checkpoint 2: validar que la modularizacion no rompe persistencia offline ni suscripciones en tiempo real.
- Checkpoint 3: revisar que los commits generados sean pequenos y auditables.

## Resultado esperado

Al cierre del sprint, TaskFlow debe conservar su funcionalidad actual y ganar mantenibilidad: reglas de tarea mas claras, acceso a Firestore mas aislado, renderizado menos riesgoso y documentacion suficiente para justificar el flujo autonomo ante revision academica.

## Commits sugeridos

```text
feat(#12): define task domain validation slice
refactor(#13): define firestore repository extraction
refactor(#14): define task renderer deepening slice
docs(#15): add autonomous sprint handoffs and checkpoint
fix(#14): preserve mobile data labels after task row refactor
```
