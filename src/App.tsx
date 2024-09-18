//import { useState } from 'react'
import PWABadge from './PWABadge.tsx'
import Navbar from './components/navbar.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import { AuthData, AuthWrapper } from './auth/AuthWrapper.tsx';
import RenderMenu from './components/renderMenu.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {

  const { user } = AuthData();
  console.log("User:", user)
  return (
    <>
      <main>
        <QueryClientProvider client={queryClient}>
          <Router>
            <AuthWrapper>
              <Navbar />
              <RenderMenu />
            </AuthWrapper>
          </Router>
        </QueryClientProvider>
      </main>
      <PWABadge />
    </>
  )
}

export default App;
