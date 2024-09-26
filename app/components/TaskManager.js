import React, { useState } from 'react';
import { useRecurrenceStore } from '../store/RecurranceStore';
import TaskModal from './TaskModal';

const TaskManager = () => {
  const { tasks, addTask } = useRecurrenceStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleTaskAdded = (newTask) => {
    addTask(newTask);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Task Manager</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-600 text-white rounded-md px-4 py-2 mb-4"
      >
        Add Task
      </button>
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="bg-blue-600 text-white rounded-md px-4 py-2 mb-4"
      >
        My Calendar
      </button>

      {isModalOpen && (
        <TaskModal onTaskAdded={handleTaskAdded} onClose={() => setIsModalOpen(false)} />
      )}

      {showCalendar && (
        <div className="mt-4 p-4 border border-gray-500 rounded-lg bg-gray-800">
          <h2 className="text-2xl font-bold mb-4">Tasks</h2>
          {tasks.length === 0 ? (
            <p>No tasks added.</p>
          ) : (
            <ul>
              {tasks.map((task, index) => (
                <li key={index} className="bg-gray-700 p-2 rounded-md mb-2">
                  <strong>Task:</strong> {task.task} <br />
                  <strong>Start Date:</strong> {task.startDate} <br />
                  <strong>End Date:</strong> {task.endDate}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskManager;
