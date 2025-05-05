import { useContext, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Typography,
  Alert
} from '@mui/material';
import { CurrencyContext } from '../contexts/CurrencyContext';

const CurrencySelector = () => {
  const { currency, setCurrency, exchangeRates, isLoading, error } = useContext(CurrencyContext);

  // Log when the component renders with updated props
  useEffect(() => {
    console.log('CurrencySelector rendered with:', {
      currency,
      exchangeRatesCount: Object.keys(exchangeRates).length,
      isLoading,
      hasError: !!error
    });
  }, [currency, exchangeRates, isLoading, error]);

  const handleChange = (event) => {
    console.log('Currency changed to:', event.target.value);
    setCurrency(event.target.value);
  };

  // Common currencies to show at the top of the list
  const commonCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR', 'CNY'];

  // Get all available currencies from exchange rates
  const allCurrencies = Object.keys(exchangeRates).sort();

  // Filter out common currencies from the all currencies list
  const otherCurrencies = allCurrencies.filter(
    (curr) => !commonCurrencies.includes(curr)
  );

  // Make sure all common currencies are available
  const availableCommonCurrencies = commonCurrencies.filter(
    curr => curr === 'USD' || exchangeRates[curr]
  );

  // If we have no exchange rates but we're not loading, show a fallback
  if (!isLoading && Object.keys(exchangeRates).length === 0) {
    return (
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Currency: {currency}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
      </Box>
    );
  }

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="currency-select-label">Currency</InputLabel>
        <Select
          labelId="currency-select-label"
          id="currency-select"
          value={currency}
          label="Currency"
          onChange={handleChange}
          disabled={isLoading}
          startAdornment={
            isLoading ? (
              <CircularProgress size={20} sx={{ mr: 1 }} />
            ) : null
          }
        >
          {/* Common currencies first */}
          {availableCommonCurrencies.map((curr) => (
            <MenuItem key={curr} value={curr}>
              {curr}
            </MenuItem>
          ))}

          {/* Divider if we have both common and other currencies */}
          {availableCommonCurrencies.length > 0 && otherCurrencies.length > 0 && (
            <MenuItem disabled divider>
              Other Currencies
            </MenuItem>
          )}

          {/* Other currencies */}
          {otherCurrencies.map((curr) => (
            <MenuItem key={curr} value={curr}>
              {curr}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default CurrencySelector;
