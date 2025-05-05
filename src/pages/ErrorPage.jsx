import { Box, Button, Container, Typography, Paper, CssBaseline } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    // Navigate to the same page to refresh it (better than window.location.reload())
    navigate(0);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5'
      }}
    >
      <CssBaseline />
      <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: 2,
            width: '100%'
          }}
        >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 3 }} />

        <Typography variant="h4" component="h1" gutterBottom color="error.main" fontWeight="bold">
          Oops!
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          Something went wrong in the application.
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 600, mb: 4 }}>
          We apologize for the inconvenience. The application encountered an unexpected error.
          You can try refreshing the page or return to the home page.
        </Typography>

        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
            size="large"
          >
            Go Back to Home Page
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={handleRefresh}
            startIcon={<RefreshIcon />}
            size="large"
          >
            Refresh Page
          </Button>
        </Box>
      </Paper>
    </Container>
    </Box>
  );
};

export default ErrorPage;
