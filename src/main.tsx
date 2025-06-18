import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AppProvider } from './context/AppContext.tsx';
import { NotificationProvider } from './components/Notifications/NotificationService.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </AppProvider>
  </StrictMode>
);