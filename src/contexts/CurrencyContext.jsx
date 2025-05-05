import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Get API key from environment variables or use a hardcoded one for now
// In a production app, always use environment variables
const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY || 'b8ccd9d260a39ef6a70bb276';

export const CurrencyContext = createContext({
  currency: 'USD',
  setCurrency: () => {},
  exchangeRates: {},
  lastUpdated: null,
  baseCode: 'USD',
  isLoading: false,
  error: null,
});

export const CurrencyContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [baseCode, setBaseCode] = useState('USD');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true);
      setError(null);

      console.log('Fetching exchange rates with API key:', API_KEY);

      try {
        const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
        console.log('API URL:', url);

        const response = await axios.get(url);
        console.log('API Response:', response.data);

        if (response.data && response.data.conversion_rates) {
          setExchangeRates(response.data.conversion_rates);
          setLastUpdated(new Date(response.data.time_last_update_unix * 1000));
          setBaseCode(response.data.base_code || 'USD');
          console.log('Exchange rates loaded successfully');
        } else {
          console.error('Failed to fetch exchange rates - no conversion_rates in response');
          setError('Failed to fetch exchange rates');
        }
      } catch (err) {
        console.error('Error fetching exchange rates:', err);
        setError('Error fetching exchange rates: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRates();

    // Set up auto-refresh every hour
    const refreshInterval = setInterval(fetchExchangeRates, 60 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  const value = {
    currency,
    setCurrency,
    exchangeRates,
    lastUpdated,
    baseCode,
    isLoading,
    error,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
