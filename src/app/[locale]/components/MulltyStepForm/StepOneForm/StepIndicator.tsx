import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index + 1 <= currentStep
                  ? 'bg-primary500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 w-full min-w-[100px] ${
                  index + 1 < currentStep ? 'bg-primary500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-sm">Basic Info</span>
        <span className="text-sm">Details</span>
        <span className="text-sm">Features & Images</span>
        <span className="text-sm">Location & Price</span>
      </div>
    </div>
  );
};

export default StepIndicator;