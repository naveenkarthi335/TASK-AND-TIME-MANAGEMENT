import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { styled } from '@mui/system';

const TaskContainer = styled(Box)(({ theme }) => ({
  maxWidth: '600px',
  margin: '0 auto',
  padding: theme.spacing(4),
  backgroundColor: theme?.palette?.background?.paper || '#fff', // Fallback to white if undefined
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));


const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const TaskButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1.5, 3),
  marginTop: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Task = ({ addTaskAndRedirect }) => {
  const [task, setTask] = useState({
    name: '',
    description: '',
    dueDate: '',
    priority: 'low',
    assigneeEmail: '',
    status: 'incomplete',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const apiUrl = 'http://127.0.0.1:8080/api/tasks';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (task.name && task.description && task.dueDate && task.assigneeEmail) {
      try {
        const response = await axios.post(apiUrl, task, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setMessage('Task added successfully.');
        addTaskAndRedirect(response.data);
      } catch (error) {
        console.error(error);
        setError('An error occurred while adding the task.');
      }
    } else {
      setError('Please fill in all required fields.');
    }
  };

  return (
    <TaskContainer>
      <Typography variant="h4" gutterBottom>
        Add Task
      </Typography>
      <FormContainer>
        {error && <Typography color="error">{error}</Typography>}
        {message && <Typography color="primary">{message}</Typography>}

        <TextField
          label="Task Name"
          name="name"
          value={task.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />

        <TextField
          label="Description"
          name="description"
          value={task.description}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />

        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          value={task.dueDate}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl variant="outlined" fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            label="Priority"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Assignee Email"
          name="assigneeEmail"
          value={task.assigneeEmail}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />

        <FormControl variant="outlined" fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={task.status}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="incomplete">Incomplete</MenuItem>
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="complete">Complete</MenuItem>
          </Select>
        </FormControl>

        <TaskButton type="submit" variant="contained" onClick={handleSubmit}>
          Add Task
        </TaskButton>
      </FormContainer>
    </TaskContainer>
  );
};

export default Task;
