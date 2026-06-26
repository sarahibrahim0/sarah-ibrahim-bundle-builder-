import React from 'react';
import { clsx } from 'clsx';
import type { Variant } from '../../types';
import { useBundleStore } from '../../store/bundleStore';

interface VariantSelectorProps {
  productId: string;
  variants: Variant[];
}

const VariantSelector = ({
  productId,
  variants,
}: VariantSelectorProps) => {
  const selectedVariantId = useBundleStore(
    (s) => s.selectedVariants[productId] ?? variants[0]?.id
  );
  const selectVariant = useBundleStore((s) => s.selectVariant);

  return (
    <div className="flex items-center gap-1.5 flex-wrap" role="radiogroup" aria-label="Select variant">
      {variants.map((v) => {
        const isSelected = selectedVariantId === v.id;
        const isDark = v.swatch === '#1F2937';
        const isWhite = v.swatch === '#FFFFFF';

        return (
          <button
            key={v.id}
            role="radio"
            aria-checked={isSelected}
            aria-label={v.name}
            onClick={(e) => { e.stopPropagation(); selectVariant(productId, v.id); }}
            className={clsx(
              "flex items-center gap-[4px] py-[1px] rounded-[2px] text-[10px] font-['Gilroy-Medium',_sans-serif] font-normal leading-[100%] tracking-[0.6px] border-[0.5px] cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E2FD2] focus-visible:ring-offset-1",
              isSelected
                ? 'px-[4px] border-border-active bg-surface-selected text-text-primary'
                : 'px-[4px] border-border-input bg-white text-text-primary hover:border-gray-400'
            )}
          >
            {/* Swatch dot */}
            <span
              className={clsx(
                'w-3 h-3 rounded-full flex-shrink-0 border',
                isWhite ? 'border-gray-300' : isDark ? 'border-gray-700' : 'border-gray-400'
              )}
              style={{ backgroundColor: v.swatch ?? '#9CA3AF' }}
              aria-hidden="true"
            />
            {v.name}
          </button>
        );
      })}
    </div>
  );
};

export default React.memo(VariantSelector);
