// src/components/TaskForm.jsx
import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low'); // Valores: low, medium, high

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return; // Validación básica

    const newTask = {
      title,
      description,
      dueDate,
      priority,
    };

    onAdd(newTask);

    // Limpiar el formulario
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('low');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Crear Nueva Tarea</h3>
      <input
        type="text"
        placeholder="Título de la Tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      
      <label>
        Vencimiento:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>

      <label>
        Prioridad:
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </label>

      <button type="submit">Añadir Tarea</button>
    </form>
  );
}

export default TaskForm;