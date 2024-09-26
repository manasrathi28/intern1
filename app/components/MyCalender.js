import React from "react";
import { Calendar } from "react-calendar"; // Make sure to install react-calendar
import "react-calendar/dist/Calendar.css"; // Import the default CSS styles for react-calendar
// import "./MyCalendar.css"; // Import your custom CSS styles

const MyCalendar = ({ tasks }) => {
  // Helper function to generate a tile class name based on tasks
  const tileClassName = ({ date, view }) => {
    const dateString = date.toLocaleDateString("en-IN");
    return tasks.some((task) => {
      const taskDate = new Date(task.startDate).toLocaleDateString("en-IN");
      return taskDate === dateString; // Highlight tiles with tasks
    })
      ? "react-calendar__tile--has-tasks"
      : "";
  };

  return (
    <div className="task-calendar">
      <Calendar
        tileClassName={tileClassName} // Use the tile class name function
        // Optionally you can add other props like onChange, value, etc.
      />
      <div className="task-details">
        {/* Render task details */}
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="task-item">
              <p>
                <strong>{task.task}</strong> -{" "}
                {new Date(task.startDate).toLocaleDateString()} to{" "}
                {new Date(task.endDate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No tasks assigned.</p>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
