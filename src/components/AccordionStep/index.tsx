import React from 'react';
import type { Product, StepIcon, BundleContent } from '../../types';
import { getBundleData } from '../../data/bundleData';
import { useBundleStore, selectCategorySelectedCount } from '../../store/bundleStore';
import ProductCard from '../ProductCard';

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

const ICONS: Record<StepIcon, React.ReactElement<any>> = {
  camera: <CameraIcon />,
  plan: <PlanIcon />,
  sensor: <SensorIcon />,
  shield: <ShieldIcon />,
};

// ─── Component ────────────────────────────────────────────────────────────────

interface AccordionStepProps {
  stepNumber: number;
  totalSteps: number;
  icon: StepIcon;
  title: string;
  category: string;
  products: Product[];
  nextLabel?: string;
}

const AccordionStep = ({
  stepNumber,
  totalSteps,
  icon,
  title,
  products,
  nextLabel,
}: AccordionStepProps) => {
  const openStep = useBundleStore((s) => s.openStep);
  const setOpenStep = useBundleStore((s) => s.setOpenStep);
  const items = useBundleStore((s) => s.items);

  const isOpen = openStep === stepNumber;
  const productIds = products.map((p) => p.id);
  const selectedCount = selectCategorySelectedCount(items, productIds);
  const content = getBundleData().content as BundleContent;
  const panelId = `accordion-panel-${stepNumber}`;
  const buttonId = `accordion-button-${stepNumber}`;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stepNumber < totalSteps) setOpenStep(stepNumber + 1);
  };

  if (isOpen) {
    return (
      <div className="w-full bg-[#EDF4FF] rounded-[10px] pt-[15px] pb-0 flex flex-col gap-[5px] border border-transparent">
        {/* Step label row (Frame 550) */}
        <div className="px-[15px] h-[12px] flex items-center">
          <span className="text-[10px] lg:text-[12px] font-['Gilroy-Medium',_sans-serif] font-normal tracking-[1.6px] leading-[100%] uppercase text-[#484848]">
            {content.accordionStep.stepLabel.replace('{stepNumber}', String(stepNumber)).replace('{totalSteps}', String(totalSteps))}
          </span>
        </div>

        {/* Frame 25 (Header + Content Wrapper) */}
        <div className="border-t-[0.5px] border-[#1F1F1F] py-[20px] px-[15px] flex flex-col gap-[15px] w-full">
          {/* Clickable Header row (Frame 552) */}
          <button
            id={buttonId}
            className="w-full flex items-center justify-between gap-[3px] text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E2FD2] focus-visible:ring-offset-2 rounded-[4px] cursor-pointer transition-colors duration-150"
            onClick={() => setOpenStep(stepNumber)}
            aria-expanded={isOpen}
            aria-controls={panelId}
          >
            {/* Title and Icon content (Frame 1419) */}
            <div className="flex items-center gap-[8px] flex-1 min-w-0">
              <span className="text-text-icon flex-shrink-0 w-[20px] h-[20px] lg:w-[26px] lg:h-[26px] flex items-center justify-center">
                {React.cloneElement(ICONS[icon], { className: 'w-[20px] h-[20px] lg:w-[26px] lg:h-[26px]' })}
              </span>
              <h2 className="text-[18px] lg:text-[22px] font-['Gilroy-SemiBold',_sans-serif] font-normal leading-[100%] text-[#0B0D10] truncate">
                {title}
              </h2>
            </div>

            {/* Selected badge + chevron (Frame 1418) */}
            <div className="flex items-center gap-[4px] flex-shrink-0">
              {selectedCount > 0 && (
                <span className="text-[14px] font-['Gilroy-Medium',_sans-serif] font-normal text-[#4E2FD2] leading-[16px]">
                  {content.accordionStep.selectedLabel.replace('{count}', String(selectedCount))}
                </span>
              )}
              <span className="text-[#4E2FD2] w-[12px] h-[12px] flex items-center justify-center">
                <svg className="w-[10px] h-[7px] fill-[#4E2FD2]" viewBox="0 0 10 7">
                  <polygon points="5,0 10,7 0,7" />
                </svg>
              </span>
            </div>
          </button>

          {/* Frame 553: Collapsible body */}
          <div id={panelId} role="region" aria-labelledby={buttonId} className="flex flex-col gap-[15px] w-full">
            {/* Flex row that wraps — one row at wide md, wraps as space shrinks */}
            <div className="flex flex-row flex-wrap gap-[15px] w-full md:justify-center lg:justify-center">
              {products.map((product) => (
                <div key={product.id} className="w-full sm:w-[calc(50%-7.5px)] md:flex-1 md:min-w-[180px] md:max-w-[224.6px] lg:w-[calc(50%-7.5px)] lg:flex-none lg:min-w-0 lg:max-w-none">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Next button centered within container */}
            {nextLabel && (
              <div className="mt-2.5 flex justify-center w-full">
                <button
                  onClick={handleNext}
                  className="w-[266px] h-[39px] flex items-center justify-center gap-[10px] border border-[#4E2FD2] text-[#4E2FD2] font-['Gilroy-SemiBold',_sans-serif] font-normal text-[18px] leading-[24px] rounded-[7px] hover:bg-[#4E2FD2]/5 active:bg-[#4E2FD2]/10 transition-colors duration-150 focus:outline-none bg-white"
                >
                  {content.accordionStep.nextButton.replace('{label}', nextLabel)}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[10px] pt-[15px] pb-0 flex flex-col gap-[5px] border border-transparent">
      {/* Step label row (Frame 550) */}
      <div className="px-[15px] h-[12px] flex items-center">
        <span className="text-[10px] font-['Gilroy-Medium',_sans-serif] font-normal tracking-[1.6px] leading-[100%] uppercase text-[#484848]">
          {content.accordionStep.stepLabel.replace('{stepNumber}', String(stepNumber)).replace('{totalSteps}', String(totalSteps))}
        </span>
      </div>

      {/* Clickable Header Button (Frame 25 collapsed) */}
      <button
        id={buttonId}
        className="w-full flex items-center justify-between gap-[3px] text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E2FD2] focus-visible:ring-offset-2 rounded-[4px] cursor-pointer transition-colors duration-150 border-t-[0.5px] border-[#1F1F1F] py-[20px] px-[15px]"
        onClick={() => setOpenStep(stepNumber)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        {/* Title and Icon content (Frame 1418) */}
        <div className="flex items-center gap-[8px] flex-1 min-w-0">
          <span className="text-text-icon flex-shrink-0 w-[20px] h-[20px] lg:w-[26px] lg:h-[26px] flex items-center justify-center">
            {React.cloneElement(ICONS[icon], { className: 'w-[20px] h-[20px] lg:w-[26px] lg:h-[26px]' })}
          </span>
          <h2 className="text-[18px] lg:text-[22px] font-['Gilroy-SemiBold',_sans-serif] font-normal leading-[100%] text-[#0B0D10] truncate">
            {title}
          </h2>
        </div>

        {/* Selected badge + chevron (Frame 1419) */}
        <div className="flex items-center gap-[4px] flex-shrink-0">
          {selectedCount > 0 && (
            <span className="text-[14px] font-['Gilroy-Medium',_sans-serif] font-normal text-[#4E2FD2] leading-[16px]">
              {content.accordionStep.selectedLabel.replace('{count}', String(selectedCount))}
            </span>
          )}
          <span className="text-[#4E2FD2] w-[12px] h-[12px] flex items-center justify-center">
            <svg className="w-[10px] h-[7px] fill-[#4E2FD2] transform rotate-180" viewBox="0 0 10 7">
              <polygon points="5,0 10,7 0,7" />
            </svg>
          </span>
        </div>
      </button>
    </div>
  );
};

export default React.memo(AccordionStep);
