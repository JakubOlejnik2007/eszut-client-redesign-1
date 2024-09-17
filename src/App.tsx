//import { useState } from 'react'
import PWABadge from './PWABadge.tsx'
import Navbar from './components/navbar.tsx'
import { ReportIssueScreen } from './pages/reportIssue.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import NAVIGATION_ITEMS from "./utils/navigationItems"

function App() {
  return (
    <>
      <main>
        <Navbar />

        <div className='window'>

          <div className='titleBar'>Zgłoś usterkę</div>
          <div className='windowContent'>
            <ReportIssueScreen></ReportIssueScreen>
          </div>
        </div>
      </main>
      <PWABadge />
    </>
  )
}

export default App
