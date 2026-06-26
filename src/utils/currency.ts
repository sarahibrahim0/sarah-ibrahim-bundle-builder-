/**
 * Format a number as USD currency.
 * e.g. 27.98 → "$27.98"
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a monthly price.
 * e.g. 9.99 → "$9.99/mo"
 */
export function formatMonthly(value: number): string {
  return `${formatCurrency(value)}/mo`;
}
