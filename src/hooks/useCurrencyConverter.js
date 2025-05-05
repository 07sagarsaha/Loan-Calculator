import { useContext, useCallback, useEffect } from 'react';
import { CurrencyContext } from '../contexts/CurrencyContext';

const useCurrencyConverter = () => {
  const { currency, exchangeRates, isLoading, error } = useContext(CurrencyContext);

  // Log the state of exchange rates for debugging
  useEffect(() => {
    if (Object.keys(exchangeRates).length > 0) {
      console.log('Exchange rates available in hook:', Object.keys(exchangeRates).length);
      console.log('Sample rates:', {
        EUR: exchangeRates.EUR,
        GBP: exchangeRates.GBP,
        JPY: exchangeRates.JPY
      });
    } else {
      console.log('No exchange rates available yet');
    }

    if (error) {
      console.error('Error in currency context:', error);
    }
  }, [exchangeRates, error]);

  const convertAmount = useCallback(
    (amount, fromCurrency = 'USD') => {
      // Handle invalid input
      if (typeof amount !== 'number' || isNaN(amount)) {
        console.warn('Invalid amount for conversion:', amount);
        return 0;
      }

      // If we don't have exchange rates yet, just return the original amount
      if (isLoading || error || !exchangeRates || Object.keys(exchangeRates).length === 0) {
        console.log('Cannot convert - missing exchange rates or loading/error state');
        return amount;
      }

      // If source and target currencies are the same, no conversion needed
      if (fromCurrency === currency) {
        return amount;
      }

      console.log(`Converting ${amount} from ${fromCurrency} to ${currency}`);

      // If converting from USD to another currency
      if (fromCurrency === 'USD') {
        const rate = exchangeRates[currency] || 1;
        console.log(`Rate for ${currency}: ${rate}`);
        return amount * rate;
      }

      // If converting from another currency to USD first, then to the target currency
      const sourceRate = exchangeRates[fromCurrency] || 1;
      const targetRate = exchangeRates[currency] || 1;
      console.log(`Source rate for ${fromCurrency}: ${sourceRate}, Target rate for ${currency}: ${targetRate}`);

      const amountInUSD = amount / sourceRate;
      return amountInUSD * targetRate;
    },
    [currency, exchangeRates, isLoading, error]
  );

  const formatCurrency = useCallback(
    (amount, decimals = 2) => {
      if (isNaN(amount)) {
        console.warn('Invalid amount for formatting:', amount);
        return '0.00';
      }

      try {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });

        return formatter.format(amount);
      } catch (err) {
        console.error('Error formatting currency:', err);
        return amount.toFixed(decimals) + ' ' + currency;
      }
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
