import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import Diversity2Icon from '@mui/icons-material/Diversity2';import MenuIcon from '@mui/icons-material/Menu';
import BatteryIndicator from '../components/battery-indicator';

const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar color="transparent" position="static" elevation={0}>
      <Toolbar className='flex'>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
          sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Diversity2Icon fontSize="large" sx={{ display: { xs: 'none', md: 'block'}}} />
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            TOP'LA
          </Link>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: { xs: 'column', md: 'row' },
            width: '70%',
          }}
        >
          {/* Affichage des noms de page uniquement sur les écrans non mobiles */}
                    <Typography variant="h6" sx={{paddingRight: '20px', display: { xs: 'none', sm: 'flex' }}}>
            <Link to="/camera" style={{ textDecoration: 'none', color: 'inherit' }}>
              Camera
            </Link>
          </Typography>
          <Typography variant="h6" sx={{paddingRight: '20px', display: { xs: 'none', sm: 'block' } }}>
            <Link to="/picture" style={{ textDecoration: 'none', color: 'inherit' }}>
              Photos
            </Link>
          </Typography>
          <Typography variant="h6" sx={{paddingRight: '20px', display: { xs: 'none', sm: 'block' } }}>
            <Link to="/map" style={{ textDecoration: 'none', color: 'inherit' }}>
              Map
            </Link>
          </Typography>
          <Typography variant="h6" sx={{paddingRight: '20px', display: { xs: 'none', sm: 'block' } }}>
            <Link to="/call" style={{ textDecoration: 'none', color: 'inherit' }}>
              Call
            </Link>
          </Typography>
                            </Box>
          <BatteryIndicator />
        {/* Menu déroulant pour les petits écrans */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/camera" style={{ textDecoration: 'none', color: 'inherit' }}>
              Camera
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/picture" style={{ textDecoration: 'none', color: 'inherit' }}>
              Photos
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/map" style={{ textDecoration: 'none', color: 'inherit' }}>
              Map
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/call" style={{ textDecoration: 'none', color: 'inherit' }}>
              Call
            </Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default App;
