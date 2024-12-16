import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: ''
  });
  const [error, setError] = useState('');
  const apiurl = "http://127.0.0.1:8080/api/users/register";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    const { username, email, password, confirmPassword, firstName, lastName, role } = formData;

    if (!username || !email || !password || !confirmPassword || !firstName || !lastName || !role) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(apiurl, {
        id: 0,
        firstName,
        lastName,
        username,
        email,
        password,
        role: role === 'leader' ? 'ADMIN' : 'USER'
      });

      console.log(response);
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError('An error occurred during sign up.');
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
          Sign Up
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
          />
          <TextField
            margin="normal"
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="">
                <em>Select Role</em>
              </MenuItem>
              <MenuItem value="leader">Leader</MenuItem>
              <MenuItem value="member">Member</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
