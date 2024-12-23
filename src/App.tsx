import PWABadge from './PWABadge.tsx'
import Navbar from './components/navigation/navbar.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import { AuthData, AuthWrapper } from './auth/AuthWrapper.tsx';
import RenderMenu from './components/renderMenu.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotificationsWrapper from './components/notificationsWrapper.tsx';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function App() {

  const { user } = AuthData();
  console.log("User:", user);
  const light = true;
  useEffect(()=>{if (light) import('./AppLight.css');})
  return (
    <>
      <main>
        <QueryClientProvider client={queryClient}>
          <Router>
            <AuthWrapper>
              <NotificationsWrapper>
                <Navbar />
                <RenderMenu />
              </NotificationsWrapper>
            </AuthWrapper>
          </Router>
        </QueryClientProvider>
      </main>
      <PWABadge />
    </>
  )
}

export default App;
