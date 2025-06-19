import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index.jsx';
import { StoreProvider } from './store/index.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <StoreProvider>
        <RouterProvider router={router} />
        <Toaster 
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </StoreProvider>
    </AuthProvider>
  </StrictMode>
);
