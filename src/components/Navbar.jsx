import { useContext, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CalculateIcon from '@mui/icons-material/Calculate';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ColorModeContext } from '../contexts/ThemeContext';
import ErrorTrigger from './ErrorTrigger';

const Navbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Check if the current route is active
  const isActive = (path) => location.pathname === path;

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'HOME', path: '/', icon: <HomeIcon /> },
    { text: 'EXCHANGE RATES', path: '/exchange-rates', icon: <CurrencyExchangeIcon /> },
    { text: 'ERROR PAGE', path: '/error', icon: <ErrorOutlineIcon /> }
  ];

  const sideDrawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={RouterLink} 
            to={item.path}
            selected={isActive(item.path)}
            sx={{
              backgroundColor: isActive(item.path) ? 'rgb(0, 128, 255)' : 'transparent',
              marginLeft: '10px',
              borderRadius: '5px',
              color: isActive(item.path) ? 'white': 'black'
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {sideDrawer}
            </Drawer>
          </>
        ) : null}
        
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Loan Calculator
        </Typography>

        {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="toggle dark mode"
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              sx={{
                backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.15)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  color: isActive('/') ? 'white' : 'black'
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

            
            <Box sx={{ mr: 1 }}>
              <ErrorTrigger />
            </Box>

            {/* Dark mode toggle only using toggle button no brighness or bark icon */}
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;



