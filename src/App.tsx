import { useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.tsx'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav className='navbar'>  <div className='logo'>ESZUT</div> </nav>  

    <main>
      <div className='window'>

        <div className='titleBar'>
          test
        </div>
        <div className='windowContent'>
          tu bedzie widok
        </div>
      </div>
    </main>
      <PWABadge />
    </>
  )
}

export default App
