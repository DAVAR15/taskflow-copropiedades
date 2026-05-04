Client Brief: TaskFlow Copropiedades

Fecha: 03 mayo de 2026
Cliente: Daniel (Supervisor de Copropiedades Residenciales)
Desarrollador: Daniel (AI-Assisted Developer)

1. Descripción del Proyecto
TaskFlow es una aplicación web pro|gresiva (PWA) diseñada para simplificar la gestión de tareas y hallazgos diarios de un supervisor de copropiedades en Medellín. La herramienta busca reemplazar los métodos manuales o aplicaciones de pago costosas por una solución personalizada y eficiente.

2. El Problema (Contexto)
En el rol de supervisor, la gestión de edificios implica recorrer áreas con nula conectividad (sótanos, cuartos de máquinas, ascensores). Las aplicaciones actuales fallan al no permitir el registro offline o son demasiado complejas. Se requiere algo rápido, intuitivo y que no pierda la información si se cae el internet.

3. Objetivos del Producto (MVP)
3.1 Movilidad Total: Interfaz optimizada para teléfonos móviles.
3.2 Persistencia Robusta: Capacidad de crear tareas sin conexión a internet.
3.3 Sincronización Automática: Los datos deben subirse a la nube (Firebase) apenas se detecte señal.
3.4 Categorización Simple: Clasificar tareas por prioridad para priorizar recorridos.

4. Requisitos Funcionales

4.1 Creación de Tareas: Formulario para ingresar Título, Descripción y Prioridad.
4.2 Gestión de Estados: Visualización clara de tareas en "Por empezar", "En curso" y "Finalizado".
4.3 Priorización: Sistema de colores según importancia (Baja, Media, Alta).
4.4 Seguridad: Acceso restringido mediante autenticación de Google.

5. Perfil de Usuario
Supervisor de copropiedades que necesita registrar incidencias rápidamente mientras realiza rondas de inspección física en las torres.

6. Stack Tecnológico Seleccionado

6.1 Frontend: Vanilla JavaScript, HTML5, CSS3.
6.2 Backend y Base de Datos: Firebase Firestore con persistencia en IndexedDB.
6.3 Hosting: Firebase Hosting para acceso global por URL.

7. Consideraciones de UX/UI

7.1 Diseño Minimalista: Interfaz limpia y sin distracciones.
7.2 Modo Oscuro: Implementado de forma nativa o seleccionable.
7.3 Feedback Inmediato: Animaciones sutiles para confirmar acciones.
