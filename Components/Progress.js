import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  Card, 
  CardContent, 
  IconButton, 
  InputLabel, 
  FormControl, 
  Divider 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';

// Styled components
const TaskCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderLeft: `5px solid`,
  borderColor: theme.palette.primary.main,
  transition: 'border-color 0.3s',
  '&:hover': {
    borderColor: theme.palette.secondary.main,
  },
}));

const StatusSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Progress = () => {
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

  const removeTask = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8080/api/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'all') return true;
      return task.status === filter;
    })
    .filter((task) => {
      return task.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  const incompleteOrInProgressTasks = filteredTasks.filter(
    (task) => task.status !== 'complete'
  );
  const completedTasks = filteredTasks.filter(
    (task) => task.status === 'complete'
  );

  return (
    <Box sx={{ p: 3, background: '#f5f5f5', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Task Progress
      </Typography>

      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Search by task name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Filter</InputLabel>
          <StatusSelect
            value={filter}
            onChange={handleFilterChange}
            label="Filter"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="incomplete">Incomplete</MenuItem>
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="complete">Complete</MenuItem>
          </StatusSelect>
        </FormControl>
      </Box>

      {tasks.length === 0 ? (
        <Typography>No tasks available.</Typography>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Incomplete / In Progress Tasks
          </Typography>
          {incompleteOrInProgressTasks.map((task) => (
            <TaskCard key={task.id} sx={{ borderColor: getTaskBorderColor(task.status) }}>
              <CardContent>
                {editingTask && editingTask.id === task.id ? (
                  <>
                    <TextField
                      label="Name"
                      name="name"
                      value={editingTask.name}
                      onChange={handleEditChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Description"
                      name="description"
                      value={editingTask.description}
                      onChange={handleEditChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Due Date"
                      type="date"
                      name="dueDate"
                      value={editingTask.dueDate}
                      onChange={handleEditChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Assignee Email"
                      name="assigneeEmail"
                      value={editingTask.assigneeEmail}
                      onChange={handleEditChange}
                      fullWidth
                      margin="normal"
                    />
                    <FormControl variant="outlined" fullWidth margin="normal">
                      <InputLabel>Status</InputLabel>
                      <StatusSelect
                        name="status"
                        value={editingTask.status}
                        onChange={handleEditChange}
                        label="Status"
                      >
                        <MenuItem value="incomplete">Incomplete</MenuItem>
                        <MenuItem value="in progress">In Progress</MenuItem>
                        <MenuItem value="complete">Complete</MenuItem>
                      </StatusSelect>
                    </FormControl>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<SaveIcon />}
                        onClick={saveTask}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={() => setEditingTask(null)}
                        sx={{ ml: 2 }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">{task.name}</Typography>
                    <Typography>{task.description}</Typography>
                    <Typography>Due Date: {task.dueDate}</Typography>
                    <Typography>Priority: {task.priority}</Typography>
                    <Typography>
                      Assignee: {task.assigneeEmail ? task.assigneeEmail : 'Unassigned'}
                    </Typography>
                    <Typography>Status: {task.status}</Typography>
                    <Box sx={{ mt: 2 }}>
                      <IconButton color="primary" onClick={() => startEditing(task)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => removeTask(task.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </>
                )}
              </CardContent>
            </TaskCard>
          ))}

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Completed Tasks
          </Typography>
          {completedTasks.map((task) => (
            <TaskCard key={task.id} sx={{ borderColor: getTaskBorderColor(task.status) }}>
              <CardContent>
                <Typography variant="h6">{task.name}</Typography>
                <Typography>{task.description}</Typography>
                <Typography>Due Date: {task.dueDate}</Typography>
                <Typography>Priority: {task.priority}</Typography>
                <Typography>
                  Assignee: {task.assigneeEmail ? task.assigneeEmail : 'Unassigned'}
                </Typography>
                <Typography>Status: {task.status}</Typography>
                <Box sx={{ mt: 2 }}>
                  <IconButton color="error" onClick={() => removeTask(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </TaskCard>
          ))}
        </>
      )}
    </Box>
  );
};

// Utility function to get border color based on task status
const getTaskBorderColor = (status) => {
  switch (status) {
    case 'incomplete':
      return '#e74c3c'; // Red
    case 'in progress':
      return '#f39c12'; // Orange
    case 'complete':
      return '#2ecc71'; // Green
    default:
      return '#3498db'; // Blue
  }
};

export default Progress;
