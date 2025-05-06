import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Header() {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Error', path: '/error' }, // Added Error page link
  ];

  const drawerList = (
    <Box
      sx={{ width: 250, bgcolor: 'background.paper' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navLinks.map((link) => (
          <ListItem
            button
            key={link.name}
            component={Link}
            to={link.path}
            sx={{
              py: 1.5,
              borderRadius: '8px',
              mx: 1,
              my: 0.5,
              backgroundColor:
                location.pathname === link.path
                  ? mode === 'light'
                    ? 'rgba(0, 0, 0, 0.1)'
                    : 'rgba(255, 255, 255, 0.1)'
                  : 'inherit',
            }}
          >
            <ListItemText primary={link.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{}}>
      <Toolbar>
        {/* Logo/Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Loan Calculator
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Button
              key={link.name}
              color="inherit"
              component={Link}
              to={link.path}
              sx={{
                mx: 1,
                borderRadius: '12px',
                backgroundColor:
                  location.pathname === link.path
                    ? mode === 'light'
                      ? 'rgba(0, 0, 0, 0.1)'
                      : 'rgba(255, 255, 255, 0.1)'
                    : 'inherit',
                '&:hover': {
                  backgroundColor:
                    mode === 'light'
                      ? 'rgba(0, 0, 0, 0.15)'
                      : 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              {link.name}
            </Button>
          ))}
          {/* Theme Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Box>
        </Box>

        {/* Mobile Navigation */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          {/* Theme Toggle */}
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
          {/* Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            {drawerList}
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
