import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { CurrencyContextProvider } from './contexts/CurrencyContext';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <CurrencyContextProvider>
          <App />
        </CurrencyContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
