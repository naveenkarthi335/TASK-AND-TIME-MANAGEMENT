import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Select, MenuItem, Typography, Grid, Paper, Box } from '@mui/material';
import './MemberProgress.css'; // Ensure to adjust if needed for custom styles

const MemberProgress = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component mounts
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const startEditing = (task) => {
    setEditingTask(task);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTask({ ...editingTask, [name]: value });
  };

  const saveTask = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8080/api/tasks/${editingTask.id}`,
        editingTask,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? response.data : task
        )
      );
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const updateTaskStatus = async (task, status) => {
    try {
      const updatedTask = { ...task, status };
      const response = await axios.put(
        `http://127.0.0.1:8080/api/tasks/${task.id}`,
        updatedTask,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === response.data.id ? response.data : task
        )
      );
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'all') return true;
      return task.status === filter;
    })
    .filter((task) => {
      return task.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (a.status === 'complete') return 1;
      if (b.status === 'complete') return -1;
      if (a.status === 'in progress') return 1;
      if (b.status === 'in progress') return -1;
      return 0;
    });

  const incompleteOrInProgressTasks = filteredTasks.filter(
    (task) => task.status !== 'complete'
  );
  const completedTasks = filteredTasks.filter(
    (task) => task.status === 'complete'
  );

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px', padding: '20px', borderRadius: '8px' }}>
      <Box sx={{ backgroundColor: '#e0f7fa', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
        <Typography variant="h4" gutterBottom>
          Member Task Progress
        </Typography>
      </Box>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search by task name"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            fullWidth
            value={filter}
            onChange={handleFilterChange}
            variant="outlined"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="incomplete">Incomplete</MenuItem>
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="complete">Complete</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {tasks.length === 0 ? (
        <Typography variant="body1">No tasks available.</Typography>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Incomplete / In Progress Tasks
          </Typography>
          <Grid container spacing={2}>
            {incompleteOrInProgressTasks.map((task) => (
              <Grid item xs={12} md={6} key={task.id}>
                <Paper elevation={3} style={{ padding: '16px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }}>
                  {editingTask && editingTask.id === task.id ? (
                    <>
                      <TextField
                        fullWidth
                        label="Task Name"
                        name="name"
                        value={editingTask.name}
                        onChange={handleEditChange}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={editingTask.description}
                        onChange={handleEditChange}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Due Date"
                        type="date"
                        name="dueDate"
                        value={editingTask.dueDate.split('T')[0]} // Format date for input
                        onChange={handleEditChange}
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                        fullWidth
                        label="Assignee Email"
                        name="assigneeEmail"
                        value={editingTask.assigneeEmail}
                        onChange={handleEditChange}
                        margin="normal"
                      />
                      <Select
                        fullWidth
                        name="status"
                        value={editingTask.status}
                        onChange={handleEditChange}
                        variant="outlined"
                        margin="normal"
                      >
                        <MenuItem value="incomplete">Incomplete</MenuItem>
                        <MenuItem value="in progress">In Progress</MenuItem>
                        <MenuItem value="complete">Complete</MenuItem>
                      </Select>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={saveTask}
                        style={{ marginRight: '8px' }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setEditingTask(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6">{task.name}</Typography>
                      <Typography variant="body1">{task.description}</Typography>
                      <Typography variant="body2">Due Date: {task.dueDate}</Typography>
                      <Typography variant="body2">Priority: {task.priority}</Typography>
                      <Typography variant="body2">
                        Assignee: {task.assigneeEmail || <em>Unassigned</em>}
                      </Typography>
                      <Typography variant="body2">Status: {task.status}</Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => startEditing(task)}
                        style={{ marginRight: '8px' }}
                      >
                        Edit
                      </Button>
                      {task.status !== 'complete' && (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => updateTaskStatus(task, 'complete')}
                        >
                          Mark as Complete
                        </Button>
                      )}
                    </>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          <Typography variant="h6" gutterBottom mt={4}>
            Completed Tasks
          </Typography>
          <Grid container spacing={2}>
            {completedTasks.map((task) => (
              <Grid item xs={12} md={6} key={task.id}>
                <Paper elevation={3} style={{ padding: '16px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#e8f5e9' }}>
                  <Typography variant="h6">{task.name}</Typography>
                  <Typography variant="body1">{task.description}</Typography>
                  <Typography variant="body2">Due Date: {task.dueDate}</Typography>
                  <Typography variant="body2">Priority: {task.priority}</Typography>
                  <Typography variant="body2">
                    Assignee: {task.assigneeEmail || <em>Unassigned</em>}
                  </Typography>
                  <Typography variant="body2">Status: {task.status}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default MemberProgress;
