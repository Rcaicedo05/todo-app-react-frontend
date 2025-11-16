// src/components/TaskFilter.jsx
function TaskFilter({ searchText, setSearchText, filterStatus, setFilterStatus, filterPriority, setFilterPriority }) {
  return (
    <div className="task-filters">
      <h3>Buscar y Filtrar</h3>
      {/* Búsqueda */}
      <input
        type="text"
        placeholder="Buscar por título o descripción..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Filtrado por Estado */}
      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="all">Todos los Estados</option>
        <option value="pending">Pendientes</option>
        <option value="in-progress">En Progreso</option>
        <option value="completed">Completadas</option>
      </select>

      {/* Filtrado por Prioridad */}
      <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
        <option value="all">Todas las Prioridades</option>
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>
    </div>
  );
}

export default TaskFilter;