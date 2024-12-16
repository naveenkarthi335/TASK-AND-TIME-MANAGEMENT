import React, { useState } from 'react';
import { Grid, Typography, Paper, Box, Container } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';


const Calendar = ({ tasks = [] }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf('month').toDate());

  // Helper functions
  const getDaysInMonth = (year, month) => {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const tasksByDate = tasks.reduce((acc, task) => {
    const date = new Date(task.dueDate).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {});

  const handleDateChange = (date) => {
    setSelectedDate(date ? date.toDate() : null);
  };

  const daysInMonth = getDaysInMonth(currentDate.year(), currentDate.month());
  const selectedDateString = new Date(selectedDate).toDateString();
  const tasksForSelectedDate = tasksByDate[selectedDateString] || [];

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Calendar
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: 16 }}>
              <DatePicker
                value={currentDate}
                onChange={(newValue) => {
                  if (newValue) {
                    setCurrentDate(newValue);
                    setSelectedDate(newValue.startOf('month').toDate());
                  }
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: 16, marginTop: 16 }}>
              <Typography variant="h6">
                Tasks for {dayjs(selectedDate).format('MMMM D, YYYY')}:
              </Typography>
              <Box mt={2}>
                {tasksForSelectedDate.length === 0 ? (
                  <Typography>No tasks for this date.</Typography>
                ) : (
                  tasksForSelectedDate.map((task) => (
                    <Box key={task.id} mb={1}>
                      <Typography>{task.name}</Typography>
                    </Box>
                  ))
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: 16, marginTop: 16 }}>
              <Typography variant="h6">Monthly View</Typography>
              <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
                  {daysInMonth.map((day, index) => {
                    const dateString = day.toDateString();
                    return (
                      <Box
                        key={index}
                        p={1}
                        bgcolor={selectedDateString === dateString ? 'primary.main' : 'transparent'}
                        color={selectedDateString === dateString ? 'white' : 'black'}
                        borderRadius="4px"
                        textAlign="center"
                        border={1}
                        borderColor="divider"
                        onClick={() => handleDateChange(dayjs(day))}
                        style={{ cursor: 'pointer' }}
                      >
                        <Typography variant="body2">{day.getDate()}</Typography>
                        {tasksByDate[dateString] && tasksByDate[dateString].map(task => (
                          <Typography key={task.id} variant="caption">
                            {task.name}
                          </Typography>
                        ))}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Container>
  );
};

export default Calendar;
