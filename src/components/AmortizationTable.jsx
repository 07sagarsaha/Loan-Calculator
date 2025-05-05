import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography 
} from '@mui/material';
import useCurrencyConverter from '../hooks/useCurrencyConverter';

const AmortizationTable = ({ schedule }) => {
  const { currency, formatCurrency } = useCurrencyConverter();

  if (!schedule || schedule.length === 0) {
    return null;
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
                  {formatCurrency(row.principalPayment, 2)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(row.interestPayment, 2)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(row.balance, 2)}
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
