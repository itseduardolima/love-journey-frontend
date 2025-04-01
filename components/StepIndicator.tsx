import { Check } from "lucide-react";

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export function StepIndicator({ totalSteps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index < currentStep
                ? "bg-primary"
                : index === currentStep
                ? "bg-primary-light"
                : "bg-gray-600"
            }`}
          >
            {index < currentStep ? (
              <Check size={16} />
            ) : (
              <span className="text-sm">{index + 1}</span>
            )}
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-600 rounded-full">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
