import { useState, useEffect, useContext } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  InputAdornment,
  Box,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { CurrencyContext } from '../contexts/CurrencyContext';
import useCurrencyConverter from '../hooks/useCurrencyConverter';

const ExchangeRates = () => {
  const { exchangeRates, isLoading, error } = useContext(CurrencyContext);
  const { formatCurrency } = useCurrencyConverter();
  const [searchTerm, setSearchTerm] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [filteredRates, setFilteredRates] = useState([]);
  
  // Currency converter state
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(100);
  const [convertedAmount, setConvertedAmount] = useState(0);
  
  // Common currencies to show at the top
  const commonCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR', 'CNY'];
  
  useEffect(() => {
    if (Object.keys(exchangeRates).length > 0) {
      // Convert exchange rates object to array for easier filtering and sorting
      const ratesArray = Object.entries(exchangeRates).map(([currency, rate]) => ({
        currency,
        rate,
        // Calculate the rate relative to the selected base currency
        relativeRate: baseCurrency === 'USD' 
          ? rate 
          : (exchangeRates['USD'] / exchangeRates[baseCurrency]) * rate
      }));
      
      // Filter rates based on search term
      const filtered = ratesArray.filter(item => 
        item.currency.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Sort by currency code
      filtered.sort((a, b) => {
        // Put common currencies at the top
        const aIsCommon = commonCurrencies.includes(a.currency);
        const bIsCommon = commonCurrencies.includes(b.currency);
        
        if (aIsCommon && !bIsCommon) return -1;
        if (!aIsCommon && bIsCommon) return 1;
        
        // Then sort alphabetically
        return a.currency.localeCompare(b.currency);
      });
      
      setFilteredRates(filtered);
      
      // Calculate converted amount for the currency converter
      if (fromCurrency && toCurrency && amount) {
        convertCurrency();
      }
    }
  }, [exchangeRates, searchTerm, baseCurrency, fromCurrency, toCurrency, amount]);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };
  
  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };
  
  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };
  
  const handleAmountChange = (event) => {
    const value = event.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };
  
  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };
  
  const convertCurrency = () => {
    if (!exchangeRates || !fromCurrency || !toCurrency || !amount) return;
    
    let result;
    if (fromCurrency === 'USD') {
      // Direct conversion from USD
      result = amount * exchangeRates[toCurrency];
    } else if (toCurrency === 'USD') {
      // Direct conversion to USD
      result = amount / exchangeRates[fromCurrency];
    } else {
      // Convert through USD
      const amountInUSD = amount / exchangeRates[fromCurrency];
      result = amountInUSD * exchangeRates[toCurrency];
    }
    
    setConvertedAmount(result);
  };
  
  // Function to format the rate with appropriate decimal places
  const formatRate = (rate) => {
    if (rate >= 1000) return rate.toFixed(2);
    if (rate >= 100) return rate.toFixed(3);
    if (rate >= 10) return rate.toFixed(4);
    if (rate >= 1) return rate.toFixed(5);
    return rate.toFixed(6);
  };
  
  // Function to get trend icon based on rate value
  const getTrendIcon = (rate) => {
    if (rate > 1) return <TrendingUpIcon color="success" />;
    if (rate < 1) return <TrendingDownIcon color="error" />;
    return <TrendingFlatIcon color="info" />;
  };
  
  // Function to get currency name from code
  const getCurrencyName = (code) => {
    const currencyNames = {
      USD: 'US Dollar',
      EUR: 'Euro',
      GBP: 'British Pound',
      JPY: 'Japanese Yen',
      CAD: 'Canadian Dollar',
      AUD: 'Australian Dollar',
      INR: 'Indian Rupee',
      CNY: 'Chinese Yuan',
      // Add more as needed
    };
    
    return currencyNames[code] || code;
  };
  
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
          <CircularProgress size={60} />
          <Typography variant="h5" sx={{ mt: 3 }}>
            Loading Exchange Rates...
          </Typography>
        </Box>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Typography variant="h4" gutterBottom>
          Exchange Rates
        </Typography>
        <Typography variant="body1">
          Unable to load exchange rates. Please try again later.
        </Typography>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Live Exchange Rates
      </Typography>
      
      {/* Currency Converter Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Currency Converter
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Amount"
              variant="outlined"
              value={amount}
              onChange={handleAmountChange}
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {fromCurrency}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="outlined" 
              onClick={swapCurrencies}
              sx={{ height: '56px', minWidth: '56px' }}
            >
              <SwapHorizIcon />
            </Button>
          </Grid>
          
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Converted Amount"
              variant="outlined"
              value={convertedAmount ? formatRate(convertedAmount) : ''}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    {toCurrency}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth>
              <InputLabel id="from-currency-label">From Currency</InputLabel>
              <Select
                labelId="from-currency-label"
                value={fromCurrency}
                label="From Currency"
                onChange={handleFromCurrencyChange}
              >
                {Object.keys(exchangeRates).sort().map((currency) => (
                  <MenuItem key={`from-${currency}`} value={currency}>
                    {currency} - {getCurrencyName(currency)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
              to
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth>
              <InputLabel id="to-currency-label">To Currency</InputLabel>
              <Select
                labelId="to-currency-label"
                value={toCurrency}
                label="To Currency"
                onChange={handleToCurrencyChange}
              >
                {Object.keys(exchangeRates).sort().map((currency) => (
                  <MenuItem key={`to-${currency}`} value={currency}>
                    {currency} - {getCurrencyName(currency)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Currency"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="base-currency-label">Base Currency</InputLabel>
              <Select
                labelId="base-currency-label"
                id="base-currency-select"
                value={baseCurrency}
                label="Base Currency"
                onChange={handleBaseCurrencyChange}
              >
                {commonCurrencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency} - {getCurrencyName(currency)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      <Typography variant="subtitle1" gutterBottom>
        Showing {filteredRates.length} currencies (Base: {baseCurrency})
      </Typography>
      
      <Grid container spacing={3}>
        {filteredRates.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.currency}>
            <Card 
              elevation={2} 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" component="div">
                    {item.currency}
                  </Typography>
                  {getTrendIcon(item.relativeRate)}
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {getCurrencyName(item.currency)}
                </Typography>
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    1 {baseCurrency} =
                  </Typography>
                  <Typography variant="h6" component="div">
                    {formatRate(item.relativeRate)} {item.currency}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {filteredRates.length === 0 && !isLoading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No currencies found matching "{searchTerm}"
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ExchangeRates;


