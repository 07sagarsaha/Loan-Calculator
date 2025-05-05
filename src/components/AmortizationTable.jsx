import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import useCurrencyConverter from '../hooks/useCurrencyConverter';
import { useContext } from 'react';
import { CurrencyContext } from '../contexts/CurrencyContext';

const AmortizationTable = ({ schedule }) => {
  const { currency, formatCurrency, convertAmount } = useCurrencyConverter();
  const { isLoading, error } = useContext(CurrencyContext);

  if (!schedule || schedule.length === 0) {
    return null;
  }

  // Show loading state
  if (isLoading) {
    return (
      <Paper elevation={3} sx={{ width: '100%', p: 4, textAlign: 'center' }}>
        <CircularProgress size={40} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading exchange rates...
        </Typography>
      </Paper>
    );
  }

  // Show error state
  if (error) {
    return (
      <Paper elevation={3} sx={{ width: '100%', p: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Typography variant="h6" sx={{ p: 2 }}>
          Amortization Schedule (USD)
        </Typography>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="amortization schedule table">
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell align="right">Principal</TableCell>
                <TableCell align="right">Interest</TableCell>
                <TableCell align="right">Remaining Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((row) => (
                <TableRow key={row.month} hover>
                  <TableCell component="th" scope="row">
                    {row.month}
                  </TableCell>
                  <TableCell align="right">
                    ${row.principalPayment.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    ${row.interestPayment.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    ${row.balance.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Amortization Schedule ({currency})
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="amortization schedule table">
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell align="right">Principal</TableCell>
              <TableCell align="right">Interest</TableCell>
              <TableCell align="right">Remaining Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((row) => (
              <TableRow key={row.month} hover>
                <TableCell component="th" scope="row">
                  {row.month}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(convertAmount(row.principalPayment), 2)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(convertAmount(row.interestPayment), 2)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(convertAmount(row.balance), 2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AmortizationTable;
