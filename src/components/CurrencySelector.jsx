import { useContext } from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  CircularProgress 
} from '@mui/material';
import { CurrencyContext } from '../contexts/CurrencyContext';

const CurrencySelector = () => {
  const { currency, setCurrency, exchangeRates, isLoading } = useContext(CurrencyContext);

  const handleChange = (event) => {
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

  return (
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
        {commonCurrencies.map((curr) => (
          <MenuItem key={curr} value={curr}>
            {curr}
          </MenuItem>
        ))}
        
        {/* Divider if we have both common and other currencies */}
        {commonCurrencies.length > 0 && otherCurrencies.length > 0 && (
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
  );
};

export default CurrencySelector;
