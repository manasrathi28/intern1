import React, { useState } from "react";
import { useRecurrenceStore } from "../store/RecurranceStore";

const TaskModal = ({ onClose }) => {
  const [task, setTask] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [numberOfYears, setNumberOfYears] = useState("");

  const { addTask } = useRecurrenceStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add task logic based on recurrence
    addTask({
      task,
      recurrence,
      startDate,
      endDate,
      daysOfWeek,
      selectedDate,
      selectedMonth,
      numberOfYears,
    });

    alert("Task added successfully!");
    onClose();
  };

  const renderRecurrenceFields = () => {
    switch (recurrence) {
      case "daily":
        return (
          <>
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </>
        );
      case "weekly":
        return (
          <>
            <label>Select Days of Week:</label>
            <div className="days-checkbox">
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day, index) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    value={index} // Use index as the day number (0-6)
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDaysOfWeek([...daysOfWeek, index]); // Add index (0-6)
                      } else {
                        setDaysOfWeek(daysOfWeek.filter((d) => d !== index)); // Remove index (0-6)
                      }
                    }}
                  />
                  {day}
                </label>
              ))}
            </div>
          </>
        );
      case "monthly":
        return (
          <>
            <label htmlFor="selectedDate">Select Date:</label>
            <input
              type="number"
              id="selectedDate"
              value={selectedDate}
              min="1"
              max="31"
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </>
        );
      case "yearly":
        return (
          <>
            <label htmlFor="selectedMonth">Select Month:</label>
            <select
              id="selectedMonth"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              required
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <label htmlFor="selectedDate">Select Date:</label>
            <input
              type="number"
              id="selectedDate"
              value={selectedDate}
              min="1"
              max="31"
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
            <label htmlFor="numberOfYears">Number of Years:</label>
            <input
              type="number"
              id="numberOfYears"
              value={numberOfYears}
              onChange={(e) => setNumberOfYears(e.target.value)}
              min="1"
              required
            />
          </>
        );
      default:
        return null; // No additional fields shown initially
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="task">Task:</label>
          <input
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
          <label htmlFor="recurrence">Recurrence:</label>
          <select
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value)}
            required
          >
            <option value="">Select Recurrence</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          {renderRecurrenceFields()}
          <div className="action-buttons">
            <button type="submit" className="submit">
              Submit
            </button>
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
