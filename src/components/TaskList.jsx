// src/components/TaskList.jsx
import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete, onToggleStatus }) {
  if (tasks.length === 0) {
    return <p>No hay tareas que coincidan con los filtros.</p>;
  }

  return (
    <ul className="task-list">
      {/* Mapea cada objeto de tarea a un componente TaskItem */}
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </ul>
  );
}

export default TaskList;