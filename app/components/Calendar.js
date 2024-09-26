"use client";
import React from 'react';
import { useRecurrenceStore } from '../store/RecurranceStore';

const Calendar = () => {
  const { tasks } = useRecurrenceStore();

  // Function to render the calendar and tasks
  const renderCalendar = () => {
    // Create a basic calendar layout (you might need to enhance this)
    let calendarDays = [];
    for (let i = 1; i <= 30; i++) { // Assuming a 30-day month for simplicity
      calendarDays.push(
        <div key={i} className="border border-gray-300 p-2">
          <div>{i}</div>
          {tasks.map(task => (
            <div key={task.id}>
              {task.startDate <= i && task.endDate >= i && (
                <div className="text-sm">{task.task}</div>
              )}
            </div>
          ))}
        </div>
      );
    }
    return calendarDays;
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {renderCalendar()}
    </div>
  );
};

export default Calendar;
