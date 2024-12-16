import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Box, Alert } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: theme.shadows[3],
}));

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const apiUrl = `http://127.0.0.1:8080/api/users/${encodeURIComponent(user.email)}`;

  useEffect(() => {
    axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setProfileData(response.data);
    })
    .catch(error => {
      console.error(error);
      setError('Failed to fetch profile data.');
    });
  }, [apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await axios.put(apiUrl, profileData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage('Profile updated successfully.');
    } catch (error) {
      console.error(error);
      setError('Failed to update profile.');
    }
  };

  const handleDelete = async () => {
    setError('');
    setMessage('');

    try {
      await axios.delete(apiUrl, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage('Profile deleted successfully.');
      logout(); // Log out the user
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error(error);
      setError('Failed to delete profile.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography variant="h5">Profile</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        <Box component="form" onSubmit={handleUpdate} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            disabled
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={profileData.username}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Update Profile
          </Button>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            onClick={handleDelete}
          >
            Delete Account
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default Profile;
