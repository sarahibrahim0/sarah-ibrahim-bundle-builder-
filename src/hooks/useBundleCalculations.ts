import { useMemo } from 'react';
import { useBundleStore, DEFAULT_VARIANT, selectProductTotalQty } from '../store/bundleStore';
import type { Product, ReviewLineItem } from '../types';
import { getBundleData } from '../data/bundleData';

const SHIPPING_COMPARE = 5.99;

export function useBundleCalculations() {
  const items = useBundleStore((s) => s.items);

  const products = getBundleData().products as Product[];

  const reviewItems = useMemo<ReviewLineItem[]>(() => {
    const lines: ReviewLineItem[] = [];

    for (const product of products) {
      const variantMap = items[product.id];
      if (!variantMap) continue;

      if (product.variants && product.variants.length > 0) {
        // Each variant is its own line
        for (const variant of product.variants) {
          const qty = variantMap[variant.id] ?? 0;
          if (qty === 0) continue;
          lines.push({
            product,
            variantId: variant.id,
            variantName: variant.name,
            quantity: qty,
            linePrice: product.isFree ? 0 : product.price * qty,
            lineComparePrice: product.comparePrice
              ? product.comparePrice * qty
              : undefined,
          });
        }
      } else {
        const qty = variantMap[DEFAULT_VARIANT] ?? 0;
        if (qty === 0 && !product.isMonthly) continue;
        // Plan always shows even at qty 1
        if (product.isMonthly && qty === 0) continue;
        lines.push({
          product,
          variantId: DEFAULT_VARIANT,
          quantity: qty,
          linePrice: product.isFree ? 0 : product.price * qty,
          lineComparePrice: product.comparePrice
            ? product.comparePrice * qty
            : undefined,
        });
      }
    }

    return lines;
  }, [items, products]);

  const totals = useMemo(() => {
    let activeTotal = 0;
    let compareTotal = 0;

    for (const line of reviewItems) {
      // Exclude the monthly plan from the one-time total
      if (line.product.isMonthly) continue;
      activeTotal += line.linePrice;
      compareTotal += line.lineComparePrice ?? line.linePrice;
    }

    const savings = compareTotal - activeTotal;
    const shippingFree = activeTotal > 0;

    return { activeTotal, compareTotal, savings, shippingFree };
  }, [reviewItems]);

  const hasItems = useMemo(
    () => products.some((p) => selectProductTotalQty(items, p.id) > 0),
    [items, products]
  );

  return { reviewItems, totals, hasItems, SHIPPING_COMPARE };
}
