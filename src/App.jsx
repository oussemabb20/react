import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Compoment,Compoment2,Compoment3} from './Compoment.jsx'
import LifecycleDemo from './LifecycleDemo.jsx'
import UpdatingDemo from './UpdatingDemo.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    
        <UpdatingDemo />
       

  )
}

export default App
