import React, { type ReactNode } from 'react';
import { clsx } from 'clsx';
import type { StepIcon } from '../../types';

// ─── Icons ────────────────────────────────────────────────────────────────────

const CameraIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const PlanIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const SensorIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const ChevronUp = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.78 15.78a.75.75 0 01-1.06 0L12 10.06l-5.72 5.72a.75.75 0 01-1.06-1.06l6.25-6.25a.75.75 0 011.06 0l6.25 6.25a.75.75 0 010 1.06z" />
  </svg>
);

const ChevronDown = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.22 8.22a.75.75 0 011.06 0L12 13.94l5.72-5.72a.75.75 0 111.06 1.06l-6.25 6.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" />
  </svg>
);

const ICONS: Record<StepIcon, ReactNode> = {
  camera: <CameraIcon />,
  plan: <PlanIcon />,
  sensor: <SensorIcon />,
  shield: <ShieldIcon />,
};

// ─── Component ────────────────────────────────────────────────────────────────

interface StepHeaderProps {
  stepNumber: number;
  totalSteps: number;
  icon: StepIcon;
  title: string;
  selectedCount: number;
  isOpen: boolean;
  onClick: () => void;
}

const StepHeader = ({
  stepNumber,
  totalSteps,
  icon,
  title,
  selectedCount,
  isOpen,
  onClick,
}: StepHeaderProps) => {
  return (
    <button
      className="w-full flex items-center gap-3 py-3 text-left group"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={`${title} - ${selectedCount} selected`}
    >
      {/* Step label */}
      <div className="flex-shrink-0 min-w-0">
        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
          STEP {stepNumber} OF {totalSteps}
        </div>

        <div className="flex items-center gap-2">
          {/* Icon */}
          <span
            className={clsx(
              'flex-shrink-0 transition-colors duration-150',
              isOpen ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-700'
            )}
          >
            {ICONS[icon]}
          </span>

          {/* Title */}
          <h2
            className={clsx(
              'text-lg font-semibold transition-colors duration-150',
              isOpen ? 'text-gray-900' : 'text-gray-800 group-hover:text-gray-900'
            )}
          >
            {title}
          </h2>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Selected count + chevron */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {selectedCount > 0 && (
          <span
            className={clsx(
              'text-sm font-medium',
              isOpen ? 'text-indigo-600' : 'text-gray-500'
            )}
          >
            {selectedCount} selected
          </span>
        )}
        <span
          className={clsx(
            'transition-colors duration-150',
            isOpen ? 'text-indigo-500' : 'text-indigo-400 group-hover:text-indigo-500'
          )}
        >
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>
    </button>
  );
};

export default React.memo(StepHeader);
