//import { useState } from 'react'
import PWABadge from './PWABadge.tsx'
import Navbar from './components/navbar.tsx'
import { ReportIssueScreen } from './pages/reportIssue.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import NAVIGATION_ITEMS from "./utils/navigationItems"
import WindowWrapper from './components/windowWrapper.tsx';
import { AuthWrapper } from './auth/AuthWrapper.tsx';

function App() {
  return (
    <>
      <main>
        <Router>

          <AuthWrapper>
            <Navbar />
            <Routes>
              {
                NAVIGATION_ITEMS.map((item, index) =>
                  <Route
                    key={index}  // Dodanie unikalnego klucza
                    path={item.path}
                    element={<WindowWrapper title={item.name} element={item.element} />}
                  />
                )
              }
            </Routes>

          </AuthWrapper>
        </Router>
      </main>
      <PWABadge />
    </>
  )
}

export default App;
