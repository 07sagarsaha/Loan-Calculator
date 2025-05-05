import { useContext, useCallback } from 'react';
import { CurrencyContext } from '../contexts/CurrencyContext';

const useCurrencyConverter = () => {
  const { currency, exchangeRates, isLoading, error } = useContext(CurrencyContext);

  const convertAmount = useCallback(
    (amount, fromCurrency = 'USD') => {
      if (isLoading || error || !exchangeRates || Object.keys(exchangeRates).length === 0) {
        return amount;
      }

      if (fromCurrency === currency) {
        return amount;
      }

      // If converting from USD to another currency
      if (fromCurrency === 'USD') {
        return amount * (exchangeRates[currency] || 1);
      }

      // If converting from another currency to USD first, then to the target currency
      const amountInUSD = amount / (exchangeRates[fromCurrency] || 1);
      return amountInUSD * (exchangeRates[currency] || 1);
    },
    [currency, exchangeRates, isLoading, error]
  );

  const formatCurrency = useCallback(
    (amount, decimals = 2) => {
      if (isNaN(amount)) return '0.00';
      
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      
      return formatter.format(amount);
    },
    [currency]
  );

  return {
    currency,
    convertAmount,
    formatCurrency,
    isLoading,
    error,
  };
};

export default useCurrencyConverter;
