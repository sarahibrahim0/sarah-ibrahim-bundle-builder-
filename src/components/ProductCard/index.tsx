import React, { useState, useCallback } from 'react';
import { clsx } from 'clsx';
import type { BundleContent, Product } from '../../types';
import { getBundleData } from '../../data/bundleData';
import { useBundleStore, DEFAULT_VARIANT, selectProductTotalQty } from '../../store/bundleStore';
import QuantityStepper from '../QuantityStepper';
import VariantSelector from '../VariantSelector';
import { formatCurrency, formatMonthly } from '../../utils/currency';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [imgError, setImgError] = useState(false);

  const items = useBundleStore((s) => s.items);
  const selectedVariantId = useBundleStore(
    (s) => s.selectedVariants[product.id] ?? product.variants?.[0]?.id ?? DEFAULT_VARIANT
  );

  const totalQty = selectProductTotalQty(items, product.id);
  const isSelected = totalQty > 0;

  const activeVariantId = product.variants?.length ? selectedVariantId : DEFAULT_VARIANT;

  const increase = useBundleStore((s) => s.increaseQuantity);

  const handleCardClick = useCallback(() => {
    increase(product.id, activeVariantId);
  }, [increase, product.id, activeVariantId]);

  const priceLabel = product.isMonthly
    ? formatMonthly(product.price)
    : formatCurrency(product.price);

  const comparePriceLabel =
    product.comparePrice != null
      ? product.isMonthly
        ? formatMonthly(product.comparePrice)
        : formatCurrency(product.comparePrice)
      : null;

  const content = getBundleData().content as BundleContent;

  return (
    <div
      className={clsx(
        'relative flex flex-row sm:flex-col lg:flex-row bg-white rounded-[10px] p-[11px] sm:p-[15px_11px] lg:p-[11px] w-full min-h-[159px] sm:min-h-[331.1px] lg:min-h-[159px] items-center gap-[13px] cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E2FD2] focus-visible:ring-offset-2',
        isSelected
          ? 'border-2 border-[#4E2FD2]/70'
          : 'border-2 border-transparent'
      )}
      onClick={handleCardClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(); } }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Select ${product.title}`}
    >
      {/* ── Image container (Frame 4479 / Frame 4480) ── */}
      <div className="relative w-[101px] sm:w-full lg:w-[101px] h-[137px] sm:h-[117.39px] flex-shrink-0 bg-white flex items-center justify-center rounded-[5px]">
        {/* Badge overlay (Frame 1420) */}
        {product.badge && (
          <div className="absolute top-0 left-0 bg-[#4E2FD2] px-[6px] py-[2px] rounded-[10px] z-10 flex items-center justify-center">
            <span className="text-[12px] font-['Gilroy-SemiBold',_sans-serif] font-normal leading-[15px] text-white text-center whitespace-nowrap">
              {product.badge}
            </span>
          </div>
        )}

        {imgError ? (
          <div className="w-full h-full bg-gray-50 rounded-[5px] flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain rounded-[5px]"
            loading="lazy"
          />
        )}
      </div>

      {/* ── Content container (Frame 547) ── */}
      <div className="flex-1 sm:w-full lg:w-auto min-w-0 flex flex-col gap-[10px] min-h-[137px] sm:min-h-[136px] lg:min-h-[137px] justify-between">

        {/* Title and Description (Frame 545) */}
        <div className="flex flex-col gap-[8px]">
          {/* Product title */}
          <h3 className="text-[16px] sm:text-[18px] lg:text-[16px] font-['Gilroy-SemiBold',_sans-serif] font-normal leading-[100%] tracking-[0.6px] text-[#1F1F1F]">
            {product.title}
          </h3>

          {/* Description + Learn More */}
          {product.description && (
            <p className="text-[12px] sm:text-[14px] lg:text-[12px] font-['Gilroy-Medium',_sans-serif] font-normal leading-[130%] tracking-[0.6px] text-[#1F1F1F]/75 line-clamp-2">
              {product.description}{' '}
              {product.learnMoreUrl && (
                <a
                  href={product.learnMoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#4E2FD2] underline hover:text-[#4E2FD2]/80 font-medium inline-block"
                >
                  {content.productCard.learnMore}
                </a>
              )}
            </p>
          )}
        </div>

        {/* Variant Selector (Frame 600) */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex items-end gap-[6px]">
            <VariantSelector productId={product.id} variants={product.variants} />
          </div>
        )}

        {/* Stepper + Price row (Frame 546) */}
        <div className="flex items-end justify-between gap-[10px] mt-auto">
          {/* Quantity stepper (Frame 1422) */}
          <QuantityStepper productId={product.id} variantId={activeVariantId} />

          {/* Price details (Frame 577) */}
          <div className="flex flex-col justify-center items-end gap-[3px] text-right flex-shrink-0">
            {comparePriceLabel && (
              <div className="text-[16px] font-['Gilroy-Regular',_sans-serif] font-normal leading-[100%] tracking-[0.6px] line-through text-[#D8392B]">
                {comparePriceLabel}
              </div>
            )}
            {product.isFree ? (
              <div className="text-[16px] font-['Gilroy-Regular',_sans-serif] font-normal leading-[100%] tracking-[0.6px] text-[#575757]">
                {content.productCard.freeLabel}
              </div>
            ) : (
              <div className="text-[16px] font-['Gilroy-Regular',_sans-serif] font-normal leading-[100%] tracking-[0.6px] text-[#575757]">
                {priceLabel}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
