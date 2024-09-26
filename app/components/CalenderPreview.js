import React from 'react';
import { useRecurrenceStore } from '../store/RecurranceStore';

const CalendarPreview = () => {
  const { tasks } = useRecurrenceStore();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
      <h3 className="text-lg font-bold text-primary mb-4">Your Tasks</h3>
      <ul>
        {tasks.length === 0 ? (
          <li className="text-gray-500">No tasks available</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index} className="mb-2">
              {task.name} - {task.startDate.toDateString()}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CalendarPreview;
