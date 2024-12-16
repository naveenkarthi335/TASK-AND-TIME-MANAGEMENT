import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#3f51b5', // Primary color
});

const Title = styled(Typography)({
  flexGrow: 1,
  fontWeight: 'bold',
  color: '#fff',
  textDecoration: 'none',
});

const StyledButton = styled(Button)({
  color: '#fff',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const Navbar = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Title variant="h6" component={Link} to="/">
          TaskMaster
        </Title>
        <StyledButton component={Link} to="/">
          Home
        </StyledButton>
        <StyledButton component={Link} to="/login">
          Login
        </StyledButton>
        <StyledButton component={Link} to="/signup">
          Sign Up
        </StyledButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
