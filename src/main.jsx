import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index.jsx';
import { StoreProvider } from './store/index.jsx';
import { Toaster } from 'react-hot-toast';
import './index.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <StrictMode>
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
  </StrictMode>
);
