import { useState } from 'react'
import PWABadge from './PWABadge.tsx'
import { Navbar } from './pages/navbar.tsx'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
    <Navbar loggedin={false} ></Navbar>

      <div className='window'>

        <div className='titleBar'>Zgłoś usterkę</div>
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
