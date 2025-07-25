'use client'

interface Step {
  id: number
  name: string
  description: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  onStepClick: (step: number) => void
}

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <nav aria-label="Character creation progress">
      <ol className="flex items-center justify-between">
        {steps.map((step, stepIdx) => (
          <li
            key={step.id}
            className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} flex-1`}
          >


            {/* Step Circle */}
            <button
              onClick={() => onStepClick(step.id)}
              className={`
                mx-auto
                relative w-8 h-8 flex items-center justify-center rounded-full border-2 
                transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500
                ${
                  step.id === currentStep
                    ? 'border-purple-500 bg-purple-500 text-white'
                    : step.id < currentStep
                    ? 'border-purple-500 bg-purple-500 text-white'
                    : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-purple-400'
                }
              `}
            >
              {step.id < currentStep ? (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
            </button>

            {/* Step Label */}
            <div className="mt-2 text-center">
              <div 
                className={`text-sm font-medium ${
                  step.id === currentStep
                    ? 'text-purple-300'
                    : step.id < currentStep
                    ? 'text-purple-400'
                    : 'text-gray-400'
                }`}
              >
                {step.name}
              </div>
              <div className="text-xs text-gray-500 hidden sm:block">
                {step.description}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
} 