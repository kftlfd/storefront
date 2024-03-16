import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/components/App';
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
        <App />
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
);
