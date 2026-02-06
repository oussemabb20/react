import { useState } from 'react'
import './ColorBox.css'

function ColorBox({ initialColor = '#ff6b35', colorOptions = [] }) {
  const [color, setColor] = useState(initialColor)

  const getRandomColor = () => {
    if (colorOptions.length > 0) {
      // Utiliser les couleurs du tableau colorOptions
      const randomIndex = Math.floor(Math.random() * colorOptions.length)
      return colorOptions[randomIndex]
    } else {
      // Générer une couleur aléatoire en hexadécimal
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
      return randomColor
    }
  }

  const handleChangeColor = () => {
    let newColor = getRandomColor()
    // S'assurer que la nouvelle couleur est différente de l'actuelle
    while (newColor === color && colorOptions.length > 1) {
      newColor = getRandomColor()
    }
    setColor(newColor)
  }

  return (
    <div className="colorbox-container">
      <div 
        className="color-box" 
        style={{ backgroundColor: color }}
      />
      <button className="color-btn" onClick={handleChangeColor}>
        Changer de couleur
      </button>
    </div>
  )
}

export default ColorBox
