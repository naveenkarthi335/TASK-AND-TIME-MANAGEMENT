import React, { useState, useContext, useEffect } from 'react';
import Task from '../Components/Task';
import Progress from '../Components/Progress';
import Calendar from '../Components/Calendar';
import Profile from '../Components/Profile';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  CssBaseline,
  Box,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.primary.dark,
}));

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
  },
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  ...theme.mixins.toolbar,
}));

const ContentStyled = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));


const LogoutButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(45),
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(1, 2),  // Adjust the padding to make the button more compact
  minWidth: 'auto',  // Reduce the minimum width to prevent overflow
  maxWidth: '85%',  // Ensure it doesn’t exceed the container width
  boxSizing: 'border-box',  // Ensure padding and border are included in the element’s width and height
  whiteSpace: 'nowrap',  // Prevent the text from wrapping to the next line
}));



const LeaderDashboard = () => {
  const [view, setView] = useState('profile');
  const [tasks, setTasks] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8080/api/tasks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const addTaskAndRedirect = async (task) => {
    try {
      const response = await axios.post('http://127.0.0.1:8080/api/tasks', task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      setTasks([...tasks, response.data]);
      setView('progress');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTaskStatus = (taskId, status) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status } : task)));
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarStyled position="fixed">
        <ToolbarStyled>
          <Typography variant="h6" noWrap>
            Leader Dashboard
          </Typography>

        </ToolbarStyled>
      </AppBarStyled>
      <DrawerStyled variant="permanent">
        <ToolbarStyled />
        <List>
          <ListItem button onClick={() => setView('task')}>
            <ListItemText primary="Task" />
          </ListItem>
          <ListItem button onClick={() => setView('progress')}>
            <ListItemText primary="Progress" />
          </ListItem>
          <ListItem button onClick={() => setView('calendar')}>
            <ListItemText primary="Calendar" />
          </ListItem>
          <ListItem button onClick={() => setView('profile')}>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
        <LogoutButton
          variant="contained"
          color="secondary"
          onClick={logout}
        >
          Logout
        </LogoutButton>
      </DrawerStyled>
      <ContentStyled>
        <ToolbarStyled />
        {view === 'task' && <Task addTaskAndRedirect={addTaskAndRedirect} />}
        {view === 'progress' && <Progress tasks={tasks} updateTaskStatus={updateTaskStatus} removeTask={removeTask} />}
        {view === 'calendar' && <Calendar tasks={tasks} />}
        {view === 'profile' && <Profile />}
      </ContentStyled>
    </Box>
  );
};

export default LeaderDashboard;
