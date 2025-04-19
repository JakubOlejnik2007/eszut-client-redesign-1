import PWABadge from './PWABadge.tsx';
import Navbar from './components/navigation/navbar.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.scss';
import './styles/AppLight.scss';
import './styles/AppTokyo.scss';
import './styles/AppDesert.scss';
import './styles/AppHighContrast.scss';
import './styles/AppRetro.scss';
import './styles/AppAero.scss';
import './styles/AppBasic.scss';
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

  const clearClasses = (element: HTMLElement) => {
    while (element.classList.length > 0) {
      element.classList.remove(element.classList.item(0) as string);
    }
  }

  useEffect(() => {
    const root = document.querySelector(':root') as HTMLElement;

    clearClasses(root);

    switch (theme) {
      case 'light':
        root.classList.add('light');
        break;
      case 'tokyo':
        root.classList.add('tokyo');
        break;
      case 'desert':
        root.classList.add('desert');
        break;
      case 'highContrast':
        root.classList.add('highContrast');
        break;
        case 'retro':
          root.classList.add('retro');
          break;
        case 'aero':
          root.classList.add('aero');
        break;
        case 'basic':
          root.classList.add('basic');
          break;
      case 'dark':
        break;
      default:
        break;
    }
  }, [theme]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthWrapper>
            <NotificationsWrapper>
              <header>
                <Navbar /></header>
              <main>
                <RenderMenu />

              </main>
            </NotificationsWrapper>
          </AuthWrapper>
        </Router>
      </QueryClientProvider>
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
