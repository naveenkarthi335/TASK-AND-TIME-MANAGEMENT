import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Divider
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const apiUrl = "http://127.0.0.1:8080/api/auth/authenticate";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password } = formData;

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(apiUrl, formData);
      console.log(response);

      const { token, role, username } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      login({ email, role, username });

      if (role === 'ADMIN') {
        navigate('/leader-dashboard');
      } else if (role === 'USER') {
        navigate('/member-dashboard');
      } else {
        setError('Invalid role.');
      }

    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" align="center">
            Don't have an account?
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/signup')}
            sx={{ mt: 1 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
