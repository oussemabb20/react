import { useState } from 'react'
import './ListManager.css'

function ListManager({ initialItems = [], placeholder = "Entrez un nouveau élément" }) {
  const [items, setItems] = useState(initialItems)
  const [inputValue, setInputValue] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleDelete = (indexToDelete) => {
    setItems(items.filter((_, index) => index !== indexToDelete))
  }

  return (
    <div className="list-container">
      <h1 className="list-title">Liste :</h1>
      
      <ul className="list-items">
        {items.map((item, index) => (
          <li key={index} className="list-item">
            <span className="item-text">{item}</span>
            <button 
              className="delete-btn" 
              onClick={() => handleDelete(index)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <form className="list-form" onSubmit={handleAdd}>
        <input
          type="text"
          className="list-input"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="add-btn">Ajouter</button>
      </form>
    </div>
  )
}

export default ListManager
