import React from 'react';
import type { ProductCategory, ReviewLineItem, BundleContent } from '../../types';
import ReviewItem from '../ReviewItem';
import SummaryFooter from '../SummaryFooter';
import { useBundleCalculations } from '../../hooks/useBundleCalculations';
import { useBundleStore } from '../../store/bundleStore';
import { formatCurrency } from '../../utils/currency';
import { getBundleData } from '../../data/bundleData';

const DeliveryIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <rect x="1" y="3" width="15" height="13" rx="1" stroke="currentColor" strokeWidth="1.8" />
    <path d="M16 8h4l3 5v4h-7V8z" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 10h2M7 10h2" stroke="#0AA288" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

function groupByCategory(items: ReviewLineItem[]): Map<ProductCategory, ReviewLineItem[]> {
  const map = new Map<ProductCategory, ReviewLineItem[]>();
  for (const item of items) {
    const cat = item.product.category;
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(item);
  }
  return map;
}

const ReviewPanel = () => {
  const _bundleData = getBundleData();
  const content = _bundleData.content as BundleContent;
  const CATEGORY_LABELS: Record<ProductCategory, string> = content.reviewPanel.categories;
  const CATEGORY_ORDER: ProductCategory[] = content.reviewPanel.categoryOrder as ProductCategory[];
  const SHIPPING_COMPARE_DISPLAY = content.reviewPanel.shipping.comparePrice;
  const monthlyPlanProduct = _bundleData.products.find((p: any) => p.isMonthly === true);
  const monthlyBadgeText = monthlyPlanProduct
    ? content.reviewPanel.rightColumn.monthlyBadge.replace('{price}', formatCurrency(monthlyPlanProduct.price))
    : content.reviewPanel.rightColumn.monthlyBadge.replace('{price}', '');
  const { reviewItems, hasItems, totals } = useBundleCalculations();
  const saveSystem = useBundleStore((s) => s.saveSystem);
  const { activeTotal, compareTotal, savings } = totals;
  const grouped = groupByCategory(reviewItems);

  const handleCheckout = () => {
    alert(content.alerts.checkout);
  };

  const handleSave = () => {
    saveSystem();
    alert(content.alerts.save);
  };

  return (
    <div className="w-full md:max-w-[1213px] mx-auto lg:w-[399px] lg:mx-0 bg-[#EDF4FF] rounded-[10px] pt-[15px] pb-0 flex flex-col gap-[5px] lg:sticky lg:top-6 h-fit">
      {/* "REVIEW" label (Frame 550) */}
      <div className="px-[15px] h-[12px] flex items-center">
        <span className="text-[10px] lg:text-[12px] font-['Gilroy-Medium',_sans-serif] leading-[100%] tracking-[1.6px] uppercase text-[#484848]">
          {content.reviewPanel.label}
        </span>
      </div>

      {/* Content area */}
      <div className="p-[20px] pb-[31px] flex flex-col gap-[10px]">
        {hasItems ? (
          <>
            {/* Two-column layout at md (Frame 4499) */}
            <div className="flex flex-col md:flex-row md:gap-[52px] gap-[10px]">
              {/* Left column (Frame 4498) */}
              <div className="flex flex-col gap-[10px] md:w-[552px] lg:w-full">
                {/* Heading (Frame 4491) */}
                <div className="flex flex-col items-start gap-[5px]">
                  <h2 className="text-[22px] md:text-[28px] lg:text-[22px] font-['Gilroy-SemiBold',_sans-serif] leading-[100%] tracking-[0.6px] text-[#1F1F1F]">
                    <span className="lg:hidden">{content.reviewPanel.heading.mobile}</span>
                    <span className="hidden lg:inline">{content.reviewPanel.heading.desktop}</span>
                  </h2>
                  <p className="text-[12px] md:text-[16px] lg:text-[14px] font-['Gilroy-Medium',_sans-serif] leading-[130%] tracking-[0.6px] text-[#1F1F1F]/75 self-stretch">
                    {content.reviewPanel.subtitle}
                  </p>
                </div>

                {/* Line items grouped by category (Frame 4489 container) */}
                <div className="flex flex-col gap-[10px]">
                  {CATEGORY_ORDER.map((cat) => {
                    const catItems = grouped.get(cat);
                    if (!catItems || catItems.length === 0) return null;
                    return (
                      <div key={cat} className="border-t border-[#CED6DE] pt-[15px] flex flex-col gap-[8px]">
                        <span className="text-[12px] font-['Gilroy-Regular',_sans-serif] leading-[16px] tracking-[0.03em] uppercase text-[#A8B2BD]">
                          {CATEGORY_LABELS[cat]}
                        </span>
                        <div className="flex flex-col gap-[12px]">
                          {catItems.map((item) => (
                            <ReviewItem
                              key={`${item.product.id}-${item.variantId}`}
                              item={item}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Shipping section (Frame 1422) */}
                  <div className="border-t border-[#CED6DE] pt-[15px]">
                    <div className="flex items-center gap-[16px]">
                      <div className="flex items-center gap-[12px] flex-1 min-w-0">
                        <span className="text-text-icon flex-shrink-0">
                          <DeliveryIcon />
                        </span>
                        <span className="text-[12px] md:text-[18px] lg:text-[14px] font-['Gilroy-Medium',_sans-serif] leading-[16px] tracking-[0.005em] text-[#0B0D10]">
                          {content.reviewPanel.shipping.label}
                        </span>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0">
                        <span className="text-[12px] md:text-[16px] lg:text-[14px] font-['Gilroy-Medium',_sans-serif] leading-[16px] tracking-[0.005em] line-through text-[#6F7882]">
                          ${SHIPPING_COMPARE_DISPLAY.toFixed(2)}
                        </span>
                        <span className="text-[12px] md:text-[16px] lg:text-[14px] font-['Gilroy-SemiBold',_sans-serif] leading-[16px] tracking-[0.005em] text-[#4E2FD2]">
                          {content.reviewPanel.shipping.freeLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column (Frame 1733) — md only, hidden at lg */}
              <div className="hidden md:flex lg:hidden md:w-[486px] flex-col gap-[15px]">
                {/* Satisfaction badge + text row */}
                <div className="flex items-center gap-[20px]">
                  <div className="w-[131px] h-[131px] rounded-full bg-[#4E2FD2] flex-shrink-0 flex items-center justify-center select-none" aria-hidden="true">
                    <div className="text-center leading-tight">
                      <div className="text-white font-bold text-[22px]">{content.reviewPanel.rightColumn.badge.percentage}</div>
                      <div className="text-white text-[12px]">{content.reviewPanel.rightColumn.badge.brand}</div>
                      <div className="text-white text-[12px]">{content.reviewPanel.rightColumn.badge.line1}</div>
                      <div className="text-white text-[12px]">{content.reviewPanel.rightColumn.badge.line2}</div>
                    </div>
                  </div>
                  <p className="text-[14px] leading-[16px] font-['Gilroy-Medium',_sans-serif] text-[#1F1F1F]">
                    {content.reviewPanel.rightColumn.badgeDescription}
                  </p>
                </div>

                {/* Pricing section */}
                <div className="flex flex-col gap-[14px]">
                  <span className="inline-flex items-center bg-[#4E2FD2] text-white text-[12px] font-['Gilroy-Medium',_sans-serif] leading-[15px] px-[8px] py-[5px] rounded-[3px] w-fit">
                    {monthlyBadgeText}
                  </span>
                  <div className="flex items-baseline gap-[10px]">
                    <span className="text-[22px] font-['Gilroy-Medium',_sans-serif] leading-none line-through text-[#484848]">
                      {formatCurrency(compareTotal)}
                    </span>
                    <span className="text-[28px] font-['Gilroy-Bold',_sans-serif] leading-none text-[#4E2FD2]">
                      {formatCurrency(activeTotal)}
                    </span>
                  </div>
                </div>

                {/* Savings text */}
                {savings > 0 && (
                  <p className="text-[14px] font-['Gilroy-SemiBold',_sans-serif] leading-[100%] text-[#0AA288]">
                    {content.reviewPanel.savingsText.replace('{amount}', formatCurrency(savings))}
                  </p>
                )}

                {/* Checkout button */}
                <button
                  onClick={handleCheckout}
                  className="w-full h-[48px] bg-[#4E2FD2] hover:bg-[#6C4FE8] text-white font-bold text-[17px] leading-[22px] rounded-[8px] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4E2FD2]"
                >
                  {content.reviewPanel.rightColumn.checkoutButton}
                </button>

                {/* Save for later */}
                <button
                  onClick={handleSave}
                  className="w-full text-[14px] font-['Gilroy-RegularItalic',_sans-serif] italic leading-[120%] underline text-[#484848] text-center hover:opacity-80 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E2FD2] focus-visible:ring-offset-2 rounded-[2px]"
                >
                  {content.reviewPanel.rightColumn.saveButton}
                </button>
              </div>
            </div>

            {/* Summary footer with pricing and checkout — md hidden, lg only */}
            <div className="md:hidden lg:block">
              <SummaryFooter />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center" aria-live="polite">
            <svg className="w-12 h-12 text-text-muted mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-sm font-medium text-text-muted">{content.reviewPanel.emptyState.title}</p>
            <p className="text-xs text-text-muted mt-1">{content.reviewPanel.emptyState.subtitle}</p>
          </div>
        )}
    </div>
    </div>
  );
};

export default React.memo(ReviewPanel);
