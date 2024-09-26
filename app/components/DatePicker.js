import React from 'react';
import { useRecurrenceStore } from '../store/RecurranceStore';

const CustomDatePicker = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useRecurrenceStore();

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Select Dates</h3>

      {/* Start Date */}
      <label className="block mb-2">Start Date</label>
      <input
        type="date"
        value={startDate ? startDate.toISOString().substr(0, 10) : ''}
        onChange={(e) => setStartDate(new Date(e.target.value))}
        className="border border-inputBorder bg-inputBackground text-text rounded-lg shadow-custom-light px-4 py-3 w-full mb-4 focus:ring-2 focus:ring-primary focus:outline-none"
        required
      />

      {/* End Date (Optional) */}
      <label className="block mb-2">End Date (Optional)</label>
      <input
        type="date"
        value={endDate ? endDate.toISOString().substr(0, 10) : ''}
        onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
        className="border border-inputBorder bg-inputBackground text-text rounded-lg shadow-custom-light px-4 py-3 w-full mb-4 focus:ring-2 focus:ring-primary focus:outline-none"
      />
    </div>
  );
};

export default CustomDatePicker;
