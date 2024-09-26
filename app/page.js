// "use client";
// import React, { useState } from 'react';
// import TaskModal from './components/TaskModal';
// import MyCalendar from './components/MyCalender';

// const MainComponent = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [showCalendar, setShowCalendar] = useState(false);

//   const handleAddTaskClick = () => {
//     setModalOpen(true);
//   };

//   const handleCalendarClick = () => {
//     setShowCalendar(true);
//     setModalOpen(false); // Close modal if open
//   };

//   return (
//     <div className="container">
//       <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
//       <button onClick={handleAddTaskClick} className="add-task-button">
//         Add Task
//       </button>
//       <button onClick={handleCalendarClick} className="my-calendar-button">
//         My Calendar
//       </button>

//       {isModalOpen && <TaskModal onClose={() => setModalOpen(false)} />}
//       {showCalendar && <MyCalendar />}
//     </div>
//   );
// };

// export default MainComponent;
"use client";
import React, { useState } from 'react';
import TaskModal from './components/TaskModal';
import MyCalendar from './components/MyCalender';
import TaskCalendar from './components/TaskCalender';

const MainComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTaskCalendar, setShowTaskCalendar] = useState(false);

  const handleAddTaskClick = () => {
    setModalOpen(true);
  };

  const handleCalendarClick = () => {
    setShowTaskCalendar(true);
    setShowCalendar(false);
    setModalOpen(false); // Close modal if open
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-4"></h1>
      <button onClick={handleAddTaskClick} className="add-task-button">
      Add Task
    </button>
      {/* <button onClick={() => setShowCalendar(true)} className="my-calendar-button">
        My Calendar
      </button>
      */}

      {isModalOpen && <TaskModal onClose={() => setModalOpen(false)} />}
      {showCalendar && <MyCalendar />}
      <TaskCalendar />
    </div>
  );
};

export default MainComponent;

