// components/SubscriptionLimits.jsx
import React, { useState, useCallback } from 'react';

interface SubscriptionLimitsProps {
    allTabs: string[];
    limits: { [key: string]: number };
    setLimits: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  }

const SubscriptionLimits = ({ allTabs, limits, setLimits }: SubscriptionLimitsProps) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleLimitChange = useCallback((tab: string, value: number) => {
    setLimits((prev: { [key: string]: number }) => {
      const newLimits: { [key: string]: number } = {}; // Create new empty object

      // Copy existing properties manually
      for (const key in prev) {
        if (prev.hasOwnProperty(key)) {
          newLimits[key] = prev[key];
        }
      }

      if (typeof tab === 'string') {
        newLimits[tab] = value;
      }

      return newLimits;
    });
  }, [setLimits]);

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-bold text-black mb-2">Subscription Start Date</label>
        <input
          type="date"
          className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold text-black mb-2">Subscription End Date</label>
        <input
          type="date"
          className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {allTabs.map(key => (
          <div key={key}>
            <label className="capitalize text-sm font-bold text-black mb-2 block">{key} Limit</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              value={limits[key]}
              onChange={(e) => handleLimitChange(key, parseInt(e.target.value) || 0)}
              placeholder={`Enter limit for ${key}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionLimits;