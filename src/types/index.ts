// ─── Product & Variant Models ───────────────────────────────────────────────

export type ProductCategory = 'cameras' | 'sensors' | 'accessories' | 'plan';

export interface Variant {
  id: string;
  name: string;
  swatch?: string; // hex color for the swatch dot
}

export interface Product {
  id: string;
  category: ProductCategory;
  title: string;
  description?: string;
  image: string;
  badge?: string;
  learnMoreUrl?: string;
  price: number;
  comparePrice?: number;
  isFree?: boolean;
  isMonthly?: boolean; // for plan pricing
  required?: boolean;
  variants?: Variant[];
}

// ─── Step Model ──────────────────────────────────────────────────────────────

export type StepIcon = 'camera' | 'plan' | 'sensor' | 'shield';

export interface Step {
  id: number;
  label: string;
  icon: StepIcon;
  category: ProductCategory;
  nextLabel?: string;
}

// ─── Bundle Data ─────────────────────────────────────────────────────────────

export interface BundleContent {
  bundleBuilder: { pageTitle: string };
  accordionStep: {
    stepLabel: string;
    selectedLabel: string;
    nextButton: string;
  };
  reviewPanel: {
    label: string;
    heading: { mobile: string; desktop: string };
    subtitle: string;
    categories: Record<ProductCategory, string>;
    categoryOrder: ProductCategory[];
    shipping: { label: string; comparePrice: number; freeLabel: string };
    rightColumn: {
      badge: { percentage: string; brand: string; line1: string; line2: string };
      badgeDescription: string;
      monthlyBadge: string;
      checkoutButton: string;
      saveButton: string;
    };
    savingsText: string;
    emptyState: { title: string; subtitle: string };
  };
  alerts: { checkout: string; save: string };
  summaryFooter: {
    monthlyBadge: string;
    badge: { percentage: string; brand: string; line1: string; line2: string };
    checkoutButton: string;
    saveButton: string;
    savingsText: string;
  };
  productCard: { learnMore: string; freeLabel: string };
}

export interface BundleData {
  steps: Step[];
  products: Product[];
  content: BundleContent;
}

// ─── Cart State ───────────────────────────────────────────────────────────────

// items[productId][variantId] = quantity
// For products without variants, variantId is '__default__'
export type CartItems = Record<string, Record<string, number>>;

// ─── Review Item (derived, not stored) ───────────────────────────────────────

export interface ReviewLineItem {
  product: Product;
  variantId: string;
  variantName?: string;
  quantity: number;
  linePrice: number;
  lineComparePrice?: number;
}
