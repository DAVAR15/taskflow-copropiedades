import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, enableIndexedDbPersistence, where, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdmgVrsS3xT3PmF8TMUMDN3niitOcrqeI",
  authDomain: "taskflow-2b167.firebaseapp.com",
  projectId: "taskflow-2b167",
  storageBucket: "taskflow-2b167.firebasestorage.app",
  messagingSenderId: "91830182287",
  appId: "1:91830182287:web:f613701364090182d0ebfa",
  measurementId: "G-YBP6YMKMWL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Activar Persistencia Offline
enableIndexedDbPersistence(db).catch(err => console.error("Error persistencia:", err.code));

const taskList = document.getElementById('task-list');
const addBtn = document.getElementById('add-btn');
const propertySelect = document.getElementById('current-property');
const addPropertyBtn = document.getElementById('add-property-btn');

let unsubscribe = null;

let activeProperty = "";

// Escuchar propiedades dinámicamente
onSnapshot(collection(db, "properties"), (snapshot) => {
    const currentVal = propertySelect.value;
    propertySelect.innerHTML = "";
    
    if (snapshot.empty) {
        propertySelect.innerHTML = '<option value="">Añade una propiedad 👉</option>';
        taskList.innerHTML = '<tr><td colspan="5" style="text-align:center">Crea una propiedad para comenzar</td></tr>';
        return;
    }

    snapshot.forEach((doc) => {
        const prop = doc.data();
        const option = document.createElement('option');
        option.value = prop.name;
        option.textContent = prop.name;
        propertySelect.appendChild(option);
    });

    // Mantener selección o seleccionar la primera
    const exists = [...propertySelect.options].some(o => o.value === currentVal);
    const nextProp = exists ? currentVal : propertySelect.options[0].value;
    
    propertySelect.value = nextProp;
    
    // Solo recargar si la propiedad cambió o es la primera carga
    if (nextProp !== activeProperty) {
        activeProperty = nextProp;
        loadTasks(nextProp);
    }
}, (error) => console.error("Error en propiedades:", error));

// Añadir nueva propiedad
addPropertyBtn.addEventListener('click', async () => {
    const name = prompt("Nombre de la nueva copropiedad/proyecto:");
    if (name && name.trim() !== "") {
        try {
            await addDoc(collection(db, "properties"), { 
                name: name.trim(),
                createdAt: serverTimestamp() 
            });
        } catch (e) {
            console.error("Error al añadir propiedad:", e);
        }
    }
});

// Guardar tarea
addBtn.addEventListener('click', async () => {
    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    const priority = document.getElementById('task-priority').value;
    const property = propertySelect.value;
    
    if (!title || !property) {
        alert("Asegúrate de escribir una actividad y seleccionar una propiedad.");
        return;
    }

    try {
        await addDoc(collection(db, "tasks"), {
            title,
            description: desc,
            priority,
            property,
            status: "por empezar",
            createdAt: serverTimestamp()
        });
        document.getElementById('task-title').value = "";
        document.getElementById('task-desc').value = "";
    } catch (e) {
        console.error("Error al añadir tarea:", e);
    }
});

const editModal = document.getElementById('edit-modal');
const editTitle = document.getElementById('edit-title');
const editDesc = document.getElementById('edit-desc');
const editPriority = document.getElementById('edit-priority');
const cancelEdit = document.getElementById('cancel-edit');
const saveEdit = document.getElementById('save-edit');

let currentEditId = null;

// Funciones globales para botones
window.editTask = (id, title, desc, priority) => {
    currentEditId = id;
    editTitle.value = title;
    editDesc.value = (desc === '-' || !desc) ? '' : desc;
    editPriority.value = priority;
    editModal.style.display = 'flex';
};

cancelEdit.addEventListener('click', () => {
    editModal.style.display = 'none';
    currentEditId = null;
});

saveEdit.addEventListener('click', async () => {
    if (currentEditId) {
        try {
            const taskRef = doc(db, "tasks", currentEditId);
            await updateDoc(taskRef, {
                title: editTitle.value,
                description: editDesc.value,
                priority: editPriority.value
            });
            editModal.style.display = 'none';
            currentEditId = null;
        } catch (e) {
            console.error("Error al actualizar:", e);
        }
    }
});

window.updateStatus = async (id, newStatus) => {
    try {
        const taskRef = doc(db, "tasks", id);
        await updateDoc(taskRef, { status: newStatus });
    } catch (e) {
        console.error("Error al actualizar estado:", e);
    }
};

window.deleteTask = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta actividad?")) {
        try {
            await deleteDoc(doc(db, "tasks", id));
        } catch (e) {
            console.error("Error al eliminar:", e);
        }
    }
};

// Leer tareas en tiempo real filtradas
function loadTasks(property) {
    if (!property) return;
    if (unsubscribe) unsubscribe();

    console.log("Cargando tareas para:", property);

    const q = query(
        collection(db, "tasks"), 
        where("property", "==", property),
        orderBy("createdAt", "desc")
    );

    unsubscribe = onSnapshot(q, (snapshot) => {
        taskList.innerHTML = "";
        if (snapshot.empty) {
            taskList.innerHTML = '<tr><td colspan="5" style="text-align:center; color: #94a3b8">No hay pendientes en esta propiedad</td></tr>';
            return;
        }

        snapshot.forEach((doc) => {
            const task = doc.data();
            const id = doc.id;
            const statusLabel = task.status || "por empezar";
            const statusClass = statusLabel.replace(/\s+/g, '-');
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td data-label="Actividad"><strong>${task.title}</strong></td>
                <td data-label="Descripción">${task.description || '-'}</td>
                <td data-label="Prioridad"><span class="priority-tag priority-${task.priority}">${task.priority}</span></td>
                <td data-label="Estado"><span class="status-pill status-${statusClass}">${statusLabel}</span></td>
                <td data-label="Acciones">
                    <button class="action-btn btn-edit" onclick="editTask('${id}', '${task.title.replace(/'/g, "\\'")}', '${(task.description || "-").replace(/'/g, "\\'")}', '${task.priority}')" title="Editar">✏️</button>
                    <button class="action-btn btn-process" onclick="updateStatus('${id}', 'en curso')" title="En curso">🔄</button>
                    <button class="action-btn btn-done" onclick="updateStatus('${id}', 'finalizado')" title="Finalizado">✅</button>
                    <button class="action-btn btn-delete" onclick="deleteTask('${id}')" title="Eliminar">🗑️</button>
                </td>
            `;
            taskList.appendChild(tr);
        });
    }, (error) => {
        console.error("Error en tareas:", error);
        if (error.code === 'failed-precondition') {
            alert("Falta crear un índice en Firebase para esta consulta. Revisa la consola del navegador (F12) y haz clic en el enlace.");
        }
    });
}

// Escuchar cambios de propiedad
propertySelect.addEventListener('change', (e) => {
    activeProperty = e.target.value;
    loadTasks(e.target.value);
});