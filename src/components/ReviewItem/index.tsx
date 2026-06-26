import React, { useState } from 'react';
import { clsx } from 'clsx';
import type { ReviewLineItem } from '../../types';
import QuantityStepper from '../QuantityStepper';
import { useBundleStore } from '../../store/bundleStore';
import { formatCurrency, formatMonthly } from '../../utils/currency';
import type { BundleContent } from '../../types';
import { getBundleData } from '../../data/bundleData';

interface ReviewItemProps {
  item: ReviewLineItem;
}

const ReviewItem = ({ item }: ReviewItemProps) => {
  const [imgError, setImgError] = useState(false);
  const { product, variantId, variantName, quantity, linePrice, lineComparePrice } = item;
  const increase = useBundleStore((s) => s.increaseQuantity);
  const decrease = useBundleStore((s) => s.decreaseQuantity);

  const content = getBundleData().content as BundleContent;
  const isMonthly = product.isMonthly === true;
  const isFree = product.isFree === true;
  const isHubRequired = product.required === true;

  const priceDisplay = isFree
    ? content.productCard.freeLabel
    : isMonthly
    ? formatMonthly(product.price)
    : formatCurrency(linePrice);

  const comparePriceDisplay = product.comparePrice != null
    ? isMonthly
      ? formatMonthly(product.comparePrice)
      : formatCurrency(lineComparePrice ?? product.comparePrice * quantity)
    : null;

  return (
    <div className="flex items-center gap-[16px] w-full">
      {/* Thumbnail + Name */}
      <div className="flex items-center gap-[12px] flex-1 min-w-0">
        {/* Thumbnail */}
        <div className="w-[41px] h-[41px] flex-shrink-0 rounded-[5px] bg-white flex items-center justify-center overflow-hidden border border-gray-100">
          {imgError ? (
            <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
          ) : (
            <img
              src={product.image}
              alt={product.title}
              onError={() => setImgError(true)}
              className="w-[41px] h-[41px] object-contain rounded-[5px]"
              loading="lazy"
            />
          )}
        </div>
        {/* Name */}
        <p className="text-[12px] md:text-[18px] lg:text-[14px] font-['Gilroy-Medium',_sans-serif] leading-[16px] tracking-[0.005em] text-[#0B0D10] truncate">
          {product.title}
          {variantName && (
            <span className="text-[#6F7882] font-normal"> ({variantName})</span>
          )}
        </p>
      </div>

      {/* Stepper — only for non-plan items */}
      {!isMonthly && (
        isHubRequired ? (
          /* Required Hub Stepper with fixed background (#F1F1F2) and border (#CED6DE) */
          <div className="flex items-center gap-[10px]" role="group" aria-label={`Quantity for ${product.title}`}>
            <button
              onClick={(e) => { e.stopPropagation(); decrease(product.id, variantId); }}
              disabled={quantity <= 0}
              aria-label="Decrease quantity"
              className={clsx(
                'flex items-center justify-center rounded-[4px] select-none w-[20px] h-[20px] text-[12px] font-bold',
                quantity <= 0
                  ? 'bg-[#F1F1F2] border border-[#CED6DE] text-[#575757] cursor-not-allowed'
                  : 'bg-white border border-[#CED6DE] text-[#0B0D10] hover:brightness-95 cursor-pointer'
              )}
            >
              −
            </button>
            <span className="tabular-nums text-center min-w-[8px] font-['Gilroy-SemiBold',_sans-serif] text-[14px] leading-[16px] text-[#0B0D10]">
              {quantity}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); increase(product.id, variantId); }}
              aria-label="Increase quantity"
              className="flex items-center justify-center rounded-[4px] select-none w-[20px] h-[20px] text-[12px] font-bold bg-white border border-[#CED6DE] text-[#0B0D10] hover:brightness-95 cursor-pointer"
            >
              +
            </button>
          </div>
        ) : (
          <QuantityStepper
            productId={product.id}
            variantId={variantId}
            variant="review"
            className="flex-shrink-0"
          />
        )
      )}

      {/* Price */}
      <div className="flex flex-col items-end flex-shrink-0 min-w-[60px]">
        {comparePriceDisplay && (
          <div className="text-[12px] md:text-[16px] lg:text-[14px] font-['Gilroy-Medium',_sans-serif] leading-[16px] tracking-[0.005em] line-through text-[#6F7882]">
            {comparePriceDisplay}
          </div>
        )}
        <div
          className={clsx(
            "text-[12px] md:text-[16px] lg:text-[14px] leading-[16px] tracking-[0.005em] font-['Gilroy-SemiBold',_sans-serif]",
            (isFree || product.price < (product.comparePrice ?? 0) || product.price === 0)
              ? "text-[#4E2FD2]"
              : "text-[#0B0D10]"
          )}
        >
          {priceDisplay}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ReviewItem);
