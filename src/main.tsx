import ReactDOM from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import './assets/index.scss';

import App from '@/components/App';
import ThemeProvider from '@/components/ThemeContext';
import store from '@/store';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('No root element found');
}

ReactDOM.createRoot(rootEl).render(
  // <React.StrictMode>
  <StoreProvider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StoreProvider>,
  // </React.StrictMode>
);
