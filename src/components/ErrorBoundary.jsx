import { Component } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BugReportIcon from '@mui/icons-material/BugReport';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <Container maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '80vh',
              textAlign: 'center',
              py: 4,
            }}
          >
            <BugReportIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom color="error">
              Something went wrong
            </Typography>
            <Typography variant="body1" paragraph>
              We apologize for the inconvenience. Please try refreshing the page or return to the home page.
            </Typography>
            <Box sx={{ mt: 2, mb: 4 }}>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/"
                sx={{ mr: 2 }}
              >
                Go to Home
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </Box>
            {process.env.NODE_ENV === 'development' && (
              <Box sx={{ mt: 4, textAlign: 'left', width: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Error Details:
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    p: 2,
                    bgcolor: 'grey.100',
                    color: 'error.main',
                    borderRadius: 1,
                    overflow: 'auto',
                    fontSize: '0.875rem',
                  }}
                >
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </Box>
              </Box>
            )}
          </Box>
        </Container>
      );
    }

    // If there's no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
