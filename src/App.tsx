//import { useState } from 'react'
import PWABadge from './PWABadge.tsx'
import Navbar from './components/navbar.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import { AuthData, AuthWrapper } from './auth/AuthWrapper.tsx';
import RenderMenu from './components/renderMenu.tsx';

function App() {

  const { user } = AuthData();
  console.log("User:", user)
  return (
    <>
      <main>
        <Router>
          <AuthWrapper>
            <Navbar />
            <RenderMenu />
          </AuthWrapper>
        </Router>
      </main>
      <PWABadge />
    </>
  )
}

export default App;
