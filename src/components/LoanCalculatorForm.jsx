import { useState, useContext } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  InputAdornment,
  Alert,
  Snackbar
} from '@mui/material';
import useEmiCalculator from '../hooks/useEmiCalculator';
import AmortizationTable from './AmortizationTable';
import CurrencySelector from './CurrencySelector';
import useCurrencyConverter from '../hooks/useCurrencyConverter';
import { CurrencyContext } from '../contexts/CurrencyContext';

const LoanCalculatorForm = () => {
  const {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    emi,
    amortizationSchedule,
    calculateEmi,
    resetCalculator
  } = useEmiCalculator();

  const { formatCurrency, convertAmount } = useCurrencyConverter();
  const { error: currencyError } = useContext(CurrencyContext);
  const [showResults, setShowResults] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    const calculatedEmi = calculateEmi();
    console.log('Calculated EMI:', calculatedEmi);
    setShowResults(true);

    // Show error snackbar if there's a currency error
    if (currencyError) {
      setErrorSnackbar(true);
    }
  };

  const handleReset = () => {
    resetCalculator();
    setShowResults(false);
  };

  const handleCloseSnackbar = () => {
    setErrorSnackbar(false);
  };

  return (
    <Box sx={{  width: '100%', px: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="start" fontStyle={'bold'}>
        Loan Calculator Dashboard
      </Typography>

      {currencyError && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Currency conversion may not be available: {currencyError}
        </Alert>
      )}

      
        <form onSubmit={handleCalculate}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4} width={230}>
              <TextField
                label="Loan Amount"
                type="number"
                fullWidth
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} md={4} width={230}>
              <TextField
                label="Interest Rate (%)"
                type="number"
                fullWidth
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} md={4} width={230}>
              <TextField
                label="Term (Years)"
                type="number"
                fullWidth
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">years</InputAdornment>,
                }}
                required
              />
            </Grid>
            
          </Grid>
          <Grid item mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 4, py: 1 }}
              >
                CALCULATE
              </Button>
            </Grid>
        </form>
        
      

      {showResults && (
        <Box sx={{ mt: 4 }}> 
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Monthly EMI: {formatCurrency(emi)}
              </Typography>
            </Grid>
          </Grid>
          
          {/* Currency and Reset buttons in different corners */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mt: 1,
            mb: 3
          }}>
            <Box sx={{ width: '100px' }}>
              <CurrencySelector />
            </Box>
            
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleReset}
            >
              RESET TABLE
            </Button>
          </Box>

          <AmortizationTable schedule={amortizationSchedule} />
        </Box>
      )}

      <Snackbar
        open={errorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Currency conversion failed. Showing values in USD.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoanCalculatorForm;




