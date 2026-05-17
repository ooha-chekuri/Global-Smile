"use client";

const steps = ["pending", "reviewing", "scheduled", "in_progress", "closed"] as const;

const stepLabels: Record<string, string> = {
  pending: "Pending Review",
  reviewing: "Reviewing",
  scheduled: "Scheduled",
  in_progress: "In Progress",
  closed: "Closed",
};

interface StatusTrackerProps {
  currentStatus: string;
}

export default function StatusTracker({ currentStatus }: StatusTrackerProps) {
  const currentIndex = steps.indexOf(currentStatus as typeof steps[number]);

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, i) => {
        const isComplete = i <= currentIndex;
        const isCurrent = step === currentStatus;

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  isCurrent
                    ? "bg-teal-600 text-white"
                    : isComplete
                    ? "bg-teal-100 text-teal-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs hidden sm:inline ${
                  isCurrent
                    ? "text-teal-700 font-medium"
                    : isComplete
                    ? "text-teal-600"
                    : "text-gray-400"
                }`}
              >
                {stepLabels[step]}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-2 ${
                  i < currentIndex ? "bg-teal-400" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
