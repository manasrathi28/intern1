// store/RecurrenceStore.js
import { create } from "zustand";

export const useRecurrenceStore = create((set, get) => ({
  tasks: [],
  calendar: new Map(),
  addTask: (task) => {
    let { recurrence, startDate, endDate } = task;
    console.log(startDate);
    console.log(endDate);
    const currentCalendar = get().calendar; // Use get() to access the current state
    switch (recurrence) {
      case "daily":
        // Loop through the dates from start to end date
        const dailyStart = new Date(startDate);
        const dailyEnd = new Date(endDate);
        let currentDate = new Date(startDate);

        while (currentDate <= dailyEnd) {
          const dateString = currentDate.toLocaleDateString("en-IN"); // Format date as YYYY-MM-DD

          // Log current date being processed
          // Check if a key for this date exists
          if (!currentCalendar.has(dateString)) {
            currentCalendar.set(dateString, []); // Create a new key if it doesn't exist
          }
          currentCalendar.get(dateString).push(task); // Append the task to the list for that date

          // Move to the next day
          currentDate.setDate(currentDate.getDate() + 1);
        }
        set({ calendar: currentCalendar });
        console.log(get().calendar);
        set((state) => ({
          tasks: [...state.tasks, task],
        }));
        break;

      case "weekly":
        const weeklyDay = task.daysOfWeek; // Assuming this is a number (0 for Sunday, 6 for Saturday)
        const today = new Date();
        console.log(weeklyDay);
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the current month
        const endOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        ); // Last day of the current month

        // Loop through each day of the month
        for (
          let day = startOfMonth.getDate();
          day <= endOfMonth.getDate();
          day++
        ) {
          const currentDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            day
          ); // Create a new date for each day

          // Check if the current date's day matches the selected weekday
          if (weeklyDay.includes(currentDate.getDay())) {
            const dateString = currentDate.toLocaleDateString("en-IN"); // Format date as YYYY-MM-DD

            // Log the date being processed
            //console.log(`Adding task for date: ${dateString}`);

            // Check if a key for this date exists
            if (!currentCalendar.has(dateString)) {
              currentCalendar.set(dateString, []); // Create a new key if it doesn't exist
            }
            currentCalendar.get(dateString).push(task); // Append the task to the list for that date
          }
        }

        // Debugging output to verify the calendar update
        console.log(
          "Weekly calendar after updates:",
          Array.from(currentCalendar.entries())
        );
        set({ calendar: currentCalendar });
        console.log(get().calendar);
        set((state) => ({
          tasks: [...state.tasks, task],
        }));
        break;

      case "monthly":
        const selectedDayOfMonth = parseInt(task.selectedDate, 10); // Get the day of the month from selectedDate
        const today1 = new Date();
        const currentYear = today1.getFullYear(); // Current year
        const currentMonth = today1.getMonth(); // Get current month

        // Loop through the next 12 months (or you can adjust the range as needed)
        for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
          // Create a date for the selected day of each month
          const monthlyDate = new Date(
            currentYear,
            currentMonth + monthOffset,
            selectedDayOfMonth
          );

          // Handle cases where the selected day doesn't exist in a month (e.g., February 30th)
          if (monthlyDate.getDate() === selectedDayOfMonth) {
            const dateString = monthlyDate.toLocaleDateString("en-IN"); // Format date as per India locale

            // Check if a key for this date exists in the calendar
            if (!currentCalendar.has(dateString)) {
              currentCalendar.set(dateString, []); // Create a new key if it doesn't exist
            }
            currentCalendar.get(dateString).push(task); // Append the task to the list for that date

            // Log the date being processed for debugging
            console.log(`Adding task for date: ${dateString}`);
          } else {
            // Log skipped months for cases where the selected day doesn't exist
            console.log(
              `Skipped: ${monthlyDate.toLocaleDateString(
                "en-IN"
              )} - Invalid day for this month`
            );
          }
        }

        // Debugging output to verify the calendar update
        console.log(
          "Monthly calendar after updates:",
          Array.from(currentCalendar.entries())
        );

        set({ calendar: currentCalendar });
        console.log(get().calendar);

        set((state) => ({
          tasks: [...state.tasks, task],
        }));
        break;
      case "yearly":
        const selectedDayOfYear = parseInt(task.selectedDate, 10); // Get the selected day from user input
        const selectedMonthOfYear = task.selectedMonth; // Get the selected month directly from user input (e.g., 0 for January, 11 for December)
        const numberOfYears = parseInt(task.numberOfYears, 10); // Get the number of years from user input
        const currentYear1 = new Date().getFullYear(); // Current year

        // Loop through the number of years specified by the user
        for (let yearOffset = 0; yearOffset < numberOfYears; yearOffset++) {
          // Create a date for the selected day and month in each year
          const yearlyDate = new Date(
            currentYear1 + yearOffset,
            selectedMonthOfYear,
            selectedDayOfYear
          );

          // Handle cases where the selected day may not exist in certain months (e.g., February 30th)
          if (yearlyDate.getDate() === selectedDayOfYear) {
            const dateString = yearlyDate.toLocaleDateString("en-IN"); // Format the date according to India locale

            // Check if a key for this date exists in the calendar
            if (!currentCalendar.has(dateString)) {
              currentCalendar.set(dateString, []); // Create a new key if it doesn't exist
            }
            currentCalendar.get(dateString).push(task); // Append the task to the list for that date

            // Log the date being processed for debugging
            console.log(`Adding task for date: ${dateString}`);
          } else {
            // Log skipped years for cases where the selected day doesn't exist in certain months
            console.log(
              `Skipped: ${yearlyDate.toLocaleDateString(
                "en-IN"
              )} - Invalid day for this month`
            );
          }
        }

        // Debugging output to verify the calendar update
        console.log(
          "Yearly calendar after updates:",
          Array.from(currentCalendar.entries())
        );

        set({ calendar: currentCalendar });
        console.log(get().calendar);

        set((state) => ({
          tasks: [...state.tasks, task],
        }));
        break;

      default:
        // Handle non-supported recurrence patterns or missing recurrence information
        console.warn(`Unsupported recurrence: ${task.recurrence}`);
        return false;
    }
  },
}));
