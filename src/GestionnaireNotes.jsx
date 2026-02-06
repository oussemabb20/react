import { useState } from 'react'
import './GestionnaireNotes.css'

function GestionnaireNotes({ initialNotes = [] }) {
  const [notes, setNotes] = useState(initialNotes)
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    const note = parseFloat(inputValue)
    
    if (isNaN(note)) {
      setError('Veuillez entrer un nombre valide')
      return
    }
    
    if (note < 0 || note > 20) {
      setError('La note doit être comprise entre 0 et 20')
      return
    }
    
    setNotes([...notes, note])
    setInputValue('')
    setError('')
  }

  const handleDelete = (indexToDelete) => {
    setNotes(notes.filter((_, index) => index !== indexToDelete))
  }

  const calculateAverage = () => {
    if (notes.length === 0) return 0
    const sum = notes.reduce((acc, note) => acc + note, 0)
    return (sum / notes.length).toFixed(2)
  }

  return (
    <div className="notes-container">
      <h1 className="notes-title">Gestionnaire de Notes</h1>
      
      <div className="notes-stats">
        <p><strong>Nombre de notes :</strong> {notes.length}</p>
        <p><strong>Moyenne :</strong> {calculateAverage()}/20</p>
      </div>

      <ul className="notes-list">
        {notes.map((note, index) => (
          <li key={index} className="note-item">
            <span className="note-value">{note}/20</span>
            <button 
              className="delete-btn" 
              onClick={() => handleDelete(index)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <form className="notes-form" onSubmit={handleAdd}>
        <input
          type="number"
          className="notes-input"
          placeholder="Entrez une note (0-20)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          min="0"
          max="20"
          step="0.5"
        />
        <button type="submit" className="add-btn">Ajouter</button>
      </form>
      
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default GestionnaireNotes
