import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Compoment,Compoment2,Compoment3} from './Compoment.jsx'
import LifecycleDemo from './LifecycleDemo.jsx'
import UpdatingDemo from './UpdatingDemo.jsx'
import Counter from './Counter.jsx'
import ListManager from './ListManager.jsx'
import ColorBox from './ColorBox.jsx'
import GestionnaireNotes from './GestionnaireNotes.jsx'
import TodoListPriorite from './TodoListPriorite.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* Counter avec valeurs par défaut (initialCount=0, step=1) */}
      <Counter />
      
      {/* Counter avec props personnalisés (initialCount=10, step=5) */}
      <Counter initialCount={10} step={5} />

      {/* ListManager avec liste initiale */}
      <ListManager 
        initialItems={['React', 'Angular', 'Vuejs']} 
        placeholder="Entrez un nouveau élément" 
      />

      {/* ColorBox avec couleur initiale et options de couleurs */}
      <ColorBox 
        initialColor="#ff6b35" 
        colorOptions={['#ff6b35', '#00ff00', '#3b82f6', '#ff0000', '#ffff00', '#800080']} 
      />

      {/* Exercice 4: Gestionnaire de Notes */}
      <GestionnaireNotes initialNotes={[15, 12, 18, 9]} />

      {/* Exercice 5: Todo List avec Priorités */}
      <TodoListPriorite 
        initialTasks={[
          { name: 'Finir le projet React', priority: 'Haute' },
          { name: 'Préparer le repas', priority: 'Moyenne' },
          { name: 'Aller courir', priority: 'Basse' }
        ]} 
      />
    </div>
  )
}

export default App
