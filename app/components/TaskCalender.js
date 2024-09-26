import React, { useState } from 'react';
import { useRecurrenceStore } from '../store/RecurranceStore';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TaskCalendar = () => {
  const { tasks, calendar } = useRecurrenceStore();
  const [date, setDate] = useState(new Date());

  // Function to get tasks for a specific date
  const getTasksForDate = (date) => {
    
    
  };

  // Custom tile content for calendar
  const tileContent = ({ date }) => {
    // date.setDate(date.getDate() +1)
    // const tasksForDate = getTasksForDate( date);
    let tasksForDate = [];
    const dateString = date.toLocaleDateString('en-IN'); // Format date as YYYY-MM-DD

    // Check if the calendar has tasks for the given date
    if (calendar.has(dateString)) {
        // Retrieve the tasks for the date
        tasksForDate = calendar.get(dateString);
        console.log('Tasks for date:', date, tasksForDate); // Log the tasks for debugging
        // return tasksForDate; // Return the tasks directly
    } else {
        console.log('No tasks found for date:', dateString); // Log when no tasks are found
        // return []; // Return an empty array if no tasks exist for the date
    }
    return tasksForDate.length > 0 ? (
      <div className="tasks-list">
        {tasksForDate.map((task, index) => (
          <div key={index} className="task-item">
            {task.task}
          </div>
        ))}
      </div>
    ) : null;
  };

  return (
    <div className="task-calendar">
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
        className="mb-4"
        locale="en-IN"
        // Removing default tile content dots
        tileClassName={({ active }) => (active ? 'bg-gray-700' : '')}
      />
      {/* <div>
        <h3 className="font-semibold mb-2">Tasks for {date.toDateString()}:</h3>
        {getTasksForDate(date).length > 0 ? (
          getTasksForDate(date).map((task, index) => (
            <div key={index} className="task-item bg-gray-800 text-white p-2 mb-1 rounded-md">
              <strong>{task.task}</strong>
              <p>Recurrence: {task.recurrence}</p>
              <p>Start Date: {task.startDate}</p>
              <p>End Date: {task.endDate}</p>
            </div>
          ))
        ) : (
          <p>No tasks for this date.</p>
        )}
      </div> */}
    </div>
  );
};

export default TaskCalendar;