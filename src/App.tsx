import PWABadge from './PWABadge.tsx';
import Navbar from './components/navigation/navbar.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import './AppLight.scss';
import './AppTokyo.scss';
import { AuthData, AuthWrapper } from './auth/AuthWrapper.tsx';
import RenderMenu from './components/renderMenu.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotificationsWrapper from './components/notificationsWrapper.tsx';
import { useEffect } from 'react';
import { ThemeProvider, useTheme } from './components/theme/ThemeContext.tsx';
const queryClient = new QueryClient();

function AppContent() {
  const { theme } = useTheme();
  const { user } = AuthData();
  console.log('User:', user);

  const clearClasses = (element: HTMLElement) => {
    while (element.classList.length > 0) {
      element.classList.remove(element.classList.item(0) as string);
    }
  }

  useEffect(() => {
    const root = document.querySelector(':root') as HTMLElement;
    console.log('Root:', root);

    clearClasses(root);

    switch (theme) {
      case 'light':
        root.classList.add('light');
        break;
      case 'tokyo':
        root.classList.add('tokyo');
        break;


      case 'dark':
        break;
      default:
        break;
    }
  }, [theme]);

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
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
