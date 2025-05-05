import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

// This component is a link to the error page
const ErrorTrigger = () => {
  const location = useLocation();
  const isActive = location.pathname === '/error';

  return (
    <Button
      color="inherit"
      component={RouterLink}
      to="/error"
      startIcon={<ErrorIcon />}
      sx={{
        backgroundColor: isActive ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 0, 0, 0.2)',
        '&:hover': {
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
        },
      }}
    >
      ERROR PAGE
    </Button>
  );
};

export default ErrorTrigger;
