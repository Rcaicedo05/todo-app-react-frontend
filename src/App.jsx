// src/App.jsx
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';

function App() {
  // Estado para almacenar todas las tareas
  const [tasks, setTasks] = useState(() => {
    // Inicializa el estado leyendo de localStorage (para persistencia simple)
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  
  // Estado para el texto de búsqueda y los filtros
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Efecto para guardar las tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // --- Funcionalidades de Tarea ---

  // 1. Crear Tarea
  const addTask = (newTask) => {
    setTasks([...tasks, { id: Date.now(), ...newTask, status: 'pending' }]);
  };

  // 2. Editar Tarea
  const editTask = (id, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };

  // 3. Eliminar Tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // 4. Marcar como Completada (o cambiar estado)
  const toggleTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  // --- Funcionalidades de Búsqueda y Filtrado ---

  // Lógica de filtrado y búsqueda
  const filteredTasks = tasks.filter(task => {
    // Búsqueda por título o descripción
    const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchText.toLowerCase());

    // Filtrado por estado
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;

    // Filtrado por prioridad
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Renderizado del componente
  return (
    <div className="app-container">
      <h1>Gestor de Tareas 📋</h1>
      <TaskForm onAdd={addTask} />

      <TaskFilter 
        searchText={searchText} 
        setSearchText={setSearchText}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
      />
      
      <TaskList 
        tasks={filteredTasks} 
        onEdit={editTask} 
        onDelete={deleteTask} 
        onToggleStatus={toggleTaskStatus} 
      />
    </div>
  );
}

export default App;