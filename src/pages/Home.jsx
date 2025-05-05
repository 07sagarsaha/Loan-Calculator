import { Box, Container } from '@mui/material';
import LoanCalculatorForm from '../components/LoanCalculatorForm';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <LoanCalculatorForm />
      </Box>
    </Container>
  );
};

export default Home;
