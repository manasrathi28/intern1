import React from 'react';
import { useRecurrenceStore } from '../store/RecurranceStore';

const RecurrencePicker = () => {
  const { frequency, setFrequency, interval, setInterval } = useRecurrenceStore();

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Select Recurrence</h3>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="daily"
              checked={frequency === 'daily'}
              onChange={() => setFrequency('daily')}
              className="mr-2"
            />
            Daily
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="weekly"
              checked={frequency === 'weekly'}
              onChange={() => setFrequency('weekly')}
              className="mr-2"
            />
            Weekly
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="monthly"
              checked={frequency === 'monthly'}
              onChange={() => setFrequency('monthly')}
              className="mr-2"
            />
            Monthly
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="yearly"
              checked={frequency === 'yearly'}
              onChange={() => setFrequency('yearly')}
              className="mr-2"
            />
            Yearly
          </label>
        </div>
      </div>

      {/* Interval Input */}
      <label className="block mb-2">Every</label>
      <input
        type="number"
        min="1"
        value={interval}
        onChange={(e) => setInterval(Number(e.target.value))}
        className="border border-inputBorder bg-inputBackground text-text rounded-lg px-4 py-2 mb-4 w-20 focus:ring-2 focus:ring-primary focus:outline-none"
      />
      <span className="ml-2 text-gray-600">
        {frequency === 'daily' ? 'days' : frequency === 'weekly' ? 'weeks' : frequency === 'monthly' ? 'months' : 'years'}
      </span>
    </div>
  );
};

export default RecurrencePicker;
