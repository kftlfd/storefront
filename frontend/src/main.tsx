import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/components/App';
import RouterProvider from '@/routing';
import StoreProvider from '@/store';
import ThemeProvider from '@/theme';

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
