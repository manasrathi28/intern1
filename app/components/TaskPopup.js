// components/TaskPopup.js
import React, { useState } from 'react';
import { useRecurrenceStore } from '../store/RecurranceStore';

const TaskPopup = ({ onClose }) => {
  const { addTask } = useRecurrenceStore();
  const [task, setTask] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [recurrence, setRecurrence] = useState('daily');
  const [selectedDays, setSelectedDays] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for adding tasks based on recurrence
    const tasksToAdd = generateTasks();
    tasksToAdd.forEach(task => addTask(task));
    alert('Task added successfully!');
    onClose();
  };

  const generateTasks = () => {
    const tasks = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (recurrence === 'daily') {
      for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
        tasks.push({ task, date: new Date(dt) });
      }
    } else if (recurrence === 'weekly') {
      selectedDays.forEach(day => {
        for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
          if (dt.getDay() === day) {
            tasks.push({ task, date: new Date(dt) });
          }
        }
      });
    } else if (recurrence === 'monthly') {
      for (let dt = start; dt <= end; dt.setMonth(dt.getMonth() + 1)) {
        tasks.push({ task, date: new Date(dt) });
      }
    } else if (recurrence === 'yearly') {
      const yearCount = prompt("Enter number of years:");
      for (let i = 0; i < yearCount; i++) {
        const newDate = new Date(start);
        newDate.setFullYear(newDate.getFullYear() + i);
        tasks.push({ task, date: newDate });
      }
    }

    return tasks;
  };

  return (
    <div className="popup-container">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task:</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Recurrence:</label>
          <select
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        {recurrence === 'weekly' && (
          <div>
            <label>Select Days:</label>
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <label key={day}>
                <input
                  type="checkbox"
                  value={day}
                  checked={selectedDays.includes(day)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedDays([...selectedDays, day]);
                    } else {
                      setSelectedDays(selectedDays.filter((d) => d !== day));
                    }
                  }}
                />
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]}
              </label>
            ))}
          </div>
        )}
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default TaskPopup;
