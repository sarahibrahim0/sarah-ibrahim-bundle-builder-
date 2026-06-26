import React from 'react';
import { formatCurrency } from '../../utils/currency';
import { useBundleStore } from '../../store/bundleStore';
import { useBundleCalculations } from '../../hooks/useBundleCalculations';
import type { BundleContent } from '../../types';
import bundleData from '../../data/bundle-data.json';

interface SummaryFooterProps {
  hideSeal?: boolean;
}

const monthlyPlanProduct = bundleData.products.find((p: any) => p.isMonthly === true);
const monthlyBadgeText = monthlyPlanProduct
  ? (bundleData as any).content.summaryFooter.monthlyBadge.replace('{price}', formatCurrency(monthlyPlanProduct.price))
  : '';

const SummaryFooter: React.FC<SummaryFooterProps> = ({ hideSeal = false }) => {
  const content = (bundleData as any).content as BundleContent;
  const saveSystem = useBundleStore((s) => s.saveSystem);
  const { totals } = useBundleCalculations();
  const { activeTotal, compareTotal, savings } = totals;

  const handleCheckout = () => {
    alert(content.alerts.checkout);
  };

  const handleSave = () => {
    saveSystem();
    alert(content.alerts.save);
  };

  return (
    <div className="mt-2 pt-2">
      {/* ── Summary Block ── */}
      <div className="flex flex-col gap-[8px] pt-[15px]">
        <div className="flex items-center justify-between gap-[8px]">
          {/* Satisfaction Badge */}
          {!hideSeal && (
            <div className="w-[78px] h-[78px] rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center select-none">
              <div className="text-center leading-tight">
                <div className="text-white font-bold text-[11px]">{content.summaryFooter.badge.percentage}</div>
                <div className="text-white text-[8px]">{content.summaryFooter.badge.brand}</div>
                <div className="text-white text-[8px]">{content.summaryFooter.badge.line1}</div>
                <div className="text-white text-[8px]">{content.summaryFooter.badge.line2}</div>
              </div>
            </div>
          )}

          {/* Price & Monthly Badge */}
          <div className="flex flex-col items-end gap-[8px] flex-1">
            <span className="inline-flex items-center bg-indigo-600 text-white text-[12px] font-['Gilroy-Medium',_sans-serif] leading-[15px] px-[8px] py-[5px] rounded-[3px]">
              {monthlyBadgeText}
            </span>
            <div className="flex items-baseline gap-[8px]">
              <span className="text-[18px] font-['Gilroy-Medium',_sans-serif] leading-[20px] line-through text-text-icon">
                {formatCurrency(compareTotal)}
              </span>
              <span className="text-[24px] font-['Gilroy-Bold',_sans-serif] leading-[32px] tracking-[-0.00125em] text-indigo-600">
                {formatCurrency(activeTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Savings and Action buttons */}
        <div className="flex flex-col gap-[4px] pt-[10px]">
          {savings > 0 && (
            <p className="text-[12px] font-['Gilroy-SemiBold',_sans-serif] leading-[100%] tracking-[-0.056px] text-[#0AA288] text-center">
              {content.summaryFooter.savingsText.replace('{amount}', formatCurrency(savings))}
            </p>
          )}
          <button
            onClick={handleCheckout}
            className="w-full py-[13px] px-[16px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[17px] leading-[22px] rounded-[4px] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600"
          >
            {content.summaryFooter.checkoutButton}
          </button>
          <button
            onClick={handleSave}
            className="w-full text-[12px] lg:text-[14px] font-['Gilroy-RegularItalic',_sans-serif] italic leading-[120%] tracking-[-0.016px] underline text-text-step text-center hover:text-text-step/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E2FD2] focus-visible:ring-offset-2 rounded-[2px]"
          >
            {content.summaryFooter.saveButton}
          </button>
        </div>
      </div>

    </div>
  );
};

export default React.memo(SummaryFooter);
