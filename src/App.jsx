import { useState } from 'react'
import './App.css'

function App() {
  const[items, setItems] = useState([])
  const[inputValue, setInputValue] = useState('')

  const handleAddItem = (e) => {
    e.preventDefault()
    if(inputValue.trim() === '') return

    const newItem = {
      id: Date.now(),
      text: inputValue,
      completed: false
    }

    setItems([...items, newItem])
    setInputValue('')
  }

const handleToggleItem = (id) => {
  setItems(items.map(item => item.id === id 
      ? { ...item, completed: !item.completed }
      : item
  ))
}

const handleDeleteItem = (e,id) => {
  e.stopPropagation()
  setItems(items.filter(item => item.id !== id))
}

  return (
    <div className="app">
      <h1>Shopping list</h1>
      <form onSubmit={handleAddItem}>
        <input 
          type="text"
          value= {inputValue}
          onChange = {(e) => setInputValue(e.target.value)}
          placeholder = "New item.." 
        />
        <button className= "submitButton" type="submit">Add Item</button>
      </form>
    {/* <p>Number of items: {items.length}</p> */}
      <ul className="item-list">
        {items.map((item) => (
          <li
            key ={item.id}
            onClick={() => handleToggleItem(item.id)}
          >
            <div className="item-content">
            <input 
              type="checkbox" 
              checked={item.completed}
              readOnly
            />
            <span className={item.completed ? 'completed' : ''}>
              {item.text}
            </span>
            </div>
            <button onClick={(e) => handleDeleteItem(e,item.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App