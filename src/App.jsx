import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ExchangeRates from './pages/ExchangeRates';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const location = useLocation();
  const isErrorPage = location.pathname === '/error';

  // Render different layouts based on the current route
  if (isErrorPage) {
    return <ErrorPage />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exchange-rates" element={<ExchangeRates />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </Box>
    </Box>
  );
}

export default App;
