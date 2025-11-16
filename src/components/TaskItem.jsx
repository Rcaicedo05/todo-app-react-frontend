// src/components/TaskItem.jsx
import { useState } from 'react';

function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  // Estado para manejar el modo de edición
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDesc, setNewDesc] = useState(task.description);
  const [newPriority, setNewPriority] = useState(task.priority);
  const [newDueDate, setNewDueDate] = useState(task.dueDate);

  // Guardar cambios de edición
  const handleSave = () => {
    onEdit(task.id, { 
      title: newTitle, 
      description: newDesc, 
      priority: newPriority,
      dueDate: newDueDate
    });
    setIsEditing(false);
  };

  // Función para obtener la clase CSS según el estado
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'in-progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  return (
    <li className={`task-item ${getStatusClass(task.status)}`}>
      {isEditing ? (
        <div className="task-edit-form">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          ></textarea>
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
          <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>

          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <div className="task-view">
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Vencimiento: **{task.dueDate || 'N/A'}**</p>
          <p>Prioridad: **{task.priority.toUpperCase()}**</p>
          <p>Estado: **{task.status.toUpperCase()}**</p>
          
          <div className="task-actions">
            <select 
              value={task.status} 
              onChange={(e) => onToggleStatus(task.id, e.target.value)}
            >
              <option value="pending">Pendiente</option>
              <option value="in-progress">En Progreso</option>
              <option value="completed">Completada</option>
            </select>
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={() => onDelete(task.id)}>Eliminar</button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;