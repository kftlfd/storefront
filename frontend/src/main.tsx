import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/components/App';
import RouterProvider from '@/pages/RouterProvider';
import StoreProvider from '@/store/StoreProvider';
import ThemeProvider from '@/theme/ThemeProvider';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('No root element found');
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <StoreProvider>
      <ThemeProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
);
