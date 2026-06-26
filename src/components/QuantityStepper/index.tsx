import React from 'react';
import { clsx } from 'clsx';
import { useBundleStore } from '../../store/bundleStore';

interface QuantityStepperProps {
  productId: string;
  variantId: string;
  size?: 'sm' | 'md';
  variant?: 'default' | 'review';
  className?: string;
}

const QuantityStepper = ({
  productId,
  variantId,
  className,
  variant: stepperVariant = 'default',
}: QuantityStepperProps) => {
  const qty = useBundleStore(
    (s) => s.items[productId]?.[variantId] ?? 0
  );
  const increase = useBundleStore((s) => s.increaseQuantity);
  const decrease = useBundleStore((s) => s.decreaseQuantity);

  const isReview = stepperVariant === 'review';

  return (
    <div
          className={clsx(
            'flex items-center gap-[10px]',
            isReview && 'py-[4px]',
            className
          )}
      role="group"
      aria-label={`Quantity for ${productId}`}
    >
      {/* Minus Button */}
      <button
        onClick={(e) => { e.stopPropagation(); decrease(productId, variantId); }}
        disabled={qty <= 0}
        aria-label="Decrease quantity"
          className={clsx(
            'flex items-center justify-center rounded-[4px] select-none w-[20px] h-[20px] text-[12px] font-bold cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E2FD2] focus-visible:ring-offset-1',
            isReview
              ? 'bg-white'
              : qty <= 0
                ? 'bg-white border-2 border-border-light text-text-disabled cursor-not-allowed'
                : 'bg-surface-raised border-2 border-surface-raised lg:bg-white lg:border-border-light text-text-stepper hover:brightness-95'
          )}
        >
          −
        </button>

        {/* Quantity Label */}
        <span
          className={clsx(
            'tabular-nums text-center min-w-[8px]',
            isReview
              ? "font-['Gilroy-SemiBold',_sans-serif] text-[14px] leading-[16px] text-text-heading"
              : "font-['Gilroy-Medium',_sans-serif] text-[16px] leading-[20px] text-text-heading"
          )}
        aria-live="polite"
        aria-atomic="true"
      >
        {qty}
      </span>

      {/* Plus Button */}
      <button
        onClick={(e) => { e.stopPropagation(); increase(productId, variantId); }}
        aria-label="Increase quantity"
        className={clsx(
          'flex items-center justify-center rounded-[4px] select-none w-[20px] h-[20px] text-[12px] font-bold cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E2FD2] focus-visible:ring-offset-1',
          isReview
            ? 'bg-white hover:bg-gray-100'
            : 'bg-surface-raised text-text-stepper hover:bg-gray-200'
        )}
      >
        +
      </button>
    </div>
  );
};

export default React.memo(QuantityStepper);
