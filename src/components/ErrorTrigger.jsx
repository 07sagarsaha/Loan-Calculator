import { useState } from 'react';
import { Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

// This component is for testing purposes only
// It deliberately throws an error when clicked
const ErrorTrigger = () => {
  const [shouldError, setShouldError] = useState(false);
  
  if (shouldError) {
    // This will trigger the ErrorBoundary
    throw new Error('This is a test error triggered by the user');
  }
  
  return (
    <Button
      color="inherit"
      onClick={() => setShouldError(true)}
      startIcon={<ErrorIcon />}
      sx={{ 
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        '&:hover': {
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
        },
      }}
    >
      TEST ERROR
    </Button>
  );
};

export default ErrorTrigger;
