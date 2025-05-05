import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

export const CurrencyContext = createContext({
  currency: 'USD',
  setCurrency: () => {},
  exchangeRates: {},
  isLoading: false,
  error: null,
});

export const CurrencyContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
        );
        if (response.data && response.data.conversion_rates) {
          setExchangeRates(response.data.conversion_rates);
        } else {
          setError('Failed to fetch exchange rates');
        }
      } catch (err) {
        setError('Error fetching exchange rates: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const value = {
    currency,
    setCurrency,
    exchangeRates,
    isLoading,
    error,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
