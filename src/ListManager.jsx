import { useState, useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import './ListManager.css'

// Composant ListItem séparé et mémoïsé pour éviter les re-renders inutiles
const ListItem = memo(function ListItem({ item, onDelete }) {
  return (
    <li className="list-item">
      <span className="item-text">{item.text}</span>
      <button 
        className="delete-btn" 
        onClick={() => onDelete(item.id)}
        aria-label={`Supprimer ${item.text}`}
      >
        Supprimer
      </button>
    </li>
  )
})

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
}

// Générateur d'ID unique
let nextId = 0
const generateId = () => ++nextId

function ListManager({ initialItems = [], placeholder = "Entrez un nouveau élément" }) {
  // Initialisation avec des objets contenant id unique
  const [items, setItems] = useState(() => 
    initialItems.map(text => ({ id: generateId(), text }))
  )
  const [inputValue, setInputValue] = useState('')

  // useCallback pour mémoriser les fonctions et éviter les re-renders
  const handleAdd = useCallback((e) => {
    e.preventDefault()
    const trimmedValue = inputValue.trim()
    if (trimmedValue) {
      setItems(prevItems => [...prevItems, { id: generateId(), text: trimmedValue }])
      setInputValue('')
    }
  }, [inputValue])

  const handleDelete = useCallback((idToDelete) => {
    setItems(prevItems => prevItems.filter(item => item.id !== idToDelete))
  }, [])

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value)
  }, [])

  return (
    <div className="list-container">
      <h1 className="list-title">Liste :</h1>
      
      {items.length === 0 ? (
        <p className="empty-message">Aucun élément dans la liste</p>
      ) : (
        <ul className="list-items" aria-label="Liste des éléments">
          {items.map(item => (
            <ListItem 
              key={item.id} 
              item={item} 
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      <form className="list-form" onSubmit={handleAdd}>
        <input
          type="text"
          className="list-input"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          aria-label="Nouvel élément"
        />
        <button 
          type="submit" 
          className="add-btn"
          disabled={!inputValue.trim()}
        >
          Ajouter
        </button>
      </form>
    </div>
  )
}

ListManager.propTypes = {
  initialItems: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string
}

export default ListManager
