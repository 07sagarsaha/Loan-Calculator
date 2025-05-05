import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  Paper,
  InputAdornment
} from '@mui/material';
import useEmiCalculator from '../hooks/useEmiCalculator';
import AmortizationTable from './AmortizationTable';
import CurrencySelector from './CurrencySelector';
import useCurrencyConverter from '../hooks/useCurrencyConverter';

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

  const { formatCurrency } = useCurrencyConverter();
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    calculateEmi();
    setShowResults(true);
  };

  const handleReset = () => {
    resetCalculator();
    setShowResults(false);
  };

  return (
    <Box sx={{ mt: 10, mb: 4, width: '100%', maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Loan Calculator Dashboard
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <form onSubmit={handleCalculate}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
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
          </Grid>
        </form>
      </Paper>

      {showResults && (
        <Box>
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  Monthly EMI: {formatCurrency(emi)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <CurrencySelector />
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={handleReset}
                >
                  RESET TABLE
                </Button>
              </Grid>
            </Grid>
          </Paper>
          
          <AmortizationTable schedule={amortizationSchedule} />
        </Box>
      )}
    </Box>
  );
};

export default LoanCalculatorForm;
