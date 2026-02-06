import { useState } from 'react'
import './Counter.css'

function Counter({ initialCount = 0, step = 1 }) {
  const [count, setCount] = useState(initialCount)

  const increment = () => {
    setCount(count + step)
  }

  const decrement = () => {
    setCount(count - step)
  }

  const reset = () => {
    setCount(initialCount)
  }

  return (
    <div className="counter-container">
      <h1 className="counter-title">Compteur : {count}</h1>
      <div className="counter-buttons">
        <button className="counter-btn" onClick={increment}>+{step}</button>
        <button className="counter-btn" onClick={decrement}>-{step}</button>
        <button className="counter-btn reset-btn" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default Counter
