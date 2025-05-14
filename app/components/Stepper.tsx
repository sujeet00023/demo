// components/Stepper.tsx
'use client';

import React from 'react';

interface StepperProps {
  currentStep: number;
  steps: string[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 text-center">
          <div
            className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
              index === currentStep
                ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
          >
            {index + 1}
          </div>
          <div className="mt-2 text-sm font-medium text-gray-800">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
