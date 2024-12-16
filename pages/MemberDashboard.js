import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import MemberProgress from '../Components/MemberProgress';
import Calendar from '../Components/Calendar';
import Profile from '../Components/Profile';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import './Dashboard.css';

const MemberDashboard = () => {
  const [view, setView] = useState('profile');
  const [tasks, setTasks] = useState([]);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      // Fetch tasks assigned to the member from the API
      axios.get(`http://localhost:8080/api/tasks/assignee/${encodeURIComponent(user.email)}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => setTasks(response.data))
        .catch(error => console.error('Error fetching tasks:', error));
    }
  }, [user.email]);

  const updateTaskStatus = (taskId, status) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status } : task));
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleLogout = () => {
    logout(); // Log out the user
    navigate('/login'); // Redirect to login page
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Paper
        elevation={3}
        style={{
          width: '250px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Member Dashboard
        </Typography>
        <List>
          <ListItem button onClick={() => setView('progress')}>
            <ListItemText primary="Assigned Tasks" />
          </ListItem>
          <ListItem button onClick={() => setView('calendar')}>
            <ListItemText primary="Calendar" />
          </ListItem>
          <ListItem button onClick={() => setView('profile')}>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
        <div style={{ flexGrow: 1 }} /> {/* This will push the logout button to the bottom */}
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
      <Container maxWidth="lg" style={{ marginLeft: '16px', flexGrow: 1 }}>
        <div className="content">
          {view === 'progress' && (
            <MemberProgress tasks={tasks} updateTaskStatus={updateTaskStatus} removeTask={removeTask} />
          )}
          {view === 'calendar' && <Calendar tasks={tasks} />}
          {view === 'profile' && <Profile />}
        </div>
      </Container>
    </div>
  );
};

export default MemberDashboard;
