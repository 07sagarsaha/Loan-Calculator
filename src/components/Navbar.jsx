import { useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CalculateIcon from '@mui/icons-material/Calculate';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { ColorModeContext } from '../contexts/ThemeContext';
import ErrorTrigger from './ErrorTrigger';

const Navbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();

  // Check if the current route is active
  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="fixed">
      <Toolbar>
        <CalculateIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Loan Calculator
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{
              backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.15)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
              },
              mr: 1
            }}
          >
            HOME
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/exchange-rates"
            startIcon={<CurrencyExchangeIcon />}
            sx={{
              backgroundColor: isActive('/exchange-rates') ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.15)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
              },
              mr: 1
            }}
          >
            EXCHANGE RATES
          </Button>

          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Only show in development mode */}
          {process.env.NODE_ENV === 'development' && (
            <Box sx={{ ml: 2 }}>
              <ErrorTrigger />
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
