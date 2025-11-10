import { useState } from 'react'
import './App.css'

function App() {
  const[tasks, setTasks] = useState([])
  const[inputValue, setInputValue] = useState('')

  const handleAddTask = (e) => {
    e.preventDefault()
    if(inputValue.trim() === '') return

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false
    }

    setTasks([...tasks, newTask])
    setInputValue('')
  }

const handleToggleTask = (id) => {
  setTasks(tasks.map(task => task.id === id 
      ? { ...task, completed: !task.completed }
      : task
  ))
}

const handleDeleteTask = (e,id) => {
  e.stopPropagation()
  setTasks(tasks.filter(task => task.id !== id))
}

  return (
    <div className="app">
      <h1>📋 Task Manager</h1>
      <form onSubmit={handleAddTask}>
        <input 
          type="text"
          value= {inputValue}
          onChange = {(e) => setInputValue(e.target.value)}
          placeholder = "New task.." 
        />
        <button type="submit">Add Task</button>
      </form>
      <p>Number of tasks: {tasks.length}</p>
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key ={task.id}
            onClick={() => handleToggleTask(task.id)}
          >
            <span onClick={() => handleToggleTask(task.id)}>
              {task.completed ? '✅' : '⬜'} {task.text}
            </span>
            <button onClick={(e) => handleDeleteTask(e,task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App