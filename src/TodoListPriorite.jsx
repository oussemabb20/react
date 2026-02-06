import { useState } from 'react'
import './TodoListPriorite.css'

function TodoListPriorite({ initialTasks = [] }) {
  const [tasks, setTasks] = useState(
    initialTasks.map((task, index) => ({
      id: index,
      name: task.name,
      priority: task.priority,
      completed: false
    }))
  )
  const [taskName, setTaskName] = useState('')
  const [priority, setPriority] = useState('Moyenne')
  const [searchTerm, setSearchTerm] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (taskName.trim() !== '') {
      const newTask = {
        id: Date.now(),
        name: taskName.trim(),
        priority: priority,
        completed: false
      }
      setTasks([...tasks, newTask])
      setTaskName('')
    }
  }

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'Haute': return 'priority-haute'
      case 'Moyenne': return 'priority-moyenne'
      case 'Basse': return 'priority-basse'
      default: return ''
    }
  }

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List avec Priorités</h1>
      
      <h3 className="tasks-subtitle">Tâches :</h3>
      
      <ul className="tasks-list">
        {filteredTasks.map(task => (
          <li 
            key={task.id} 
            className={`task-item ${getPriorityClass(task.priority)} ${task.completed ? 'completed' : ''}`}
          >
            <span className={`task-name ${task.completed ? 'task-completed' : ''}`}>
              {task.name}
            </span>
            <span className="task-priority"> - {task.priority}</span>
            <button 
              className={`toggle-btn ${task.completed ? 'btn-not-done' : 'btn-done'}`}
              onClick={() => toggleComplete(task.id)}
            >
              {task.completed ? 'Non terminé' : 'Terminé'}
            </button>
            <button 
              className="delete-task-btn" 
              onClick={() => handleDelete(task.id)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <div className="todo-stats">
        <p><strong>Total des tâches :</strong> {totalTasks}</p>
        <p><strong>Tâches terminées :</strong> {completedTasks}</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher une tâche"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <form className="todo-form" onSubmit={handleAdd}>
        <input
          type="text"
          className="task-input"
          placeholder="Nom de la tâche"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <select 
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Haute">Haute</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Basse">Basse</option>
        </select>
        <button type="submit" className="add-task-btn">Ajouter</button>
      </form>
    </div>
  )
}

export default TodoListPriorite
