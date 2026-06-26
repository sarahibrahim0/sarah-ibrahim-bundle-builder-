import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItems } from '../types';

// ─── Constants ────────────────────────────────────────────────────────────────

export const DEFAULT_VARIANT = '__default__';

// ─── State Shape ──────────────────────────────────────────────────────────────

interface BundleState {
  // cart: items[productId][variantId] = quantity
  items: CartItems;
  // Currently displayed variant per product
  selectedVariants: Record<string, string>;
  // Which accordion step is open (1–4). 0 = all collapsed.
  openStep: number;
}

// ─── Actions ──────────────────────────────────────────────────────────────────

interface BundleActions {
  increaseQuantity: (productId: string, variantId: string) => void;
  decreaseQuantity: (productId: string, variantId: string) => void;
  selectVariant: (productId: string, variantId: string) => void;
  setOpenStep: (step: number) => void;
  saveSystem: () => void;
  resetStore: () => void;
}

export type BundleStore = BundleState & BundleActions;

// ─── Initial State (pre-seeded from Figma) ────────────────────────────────────

const INITIAL_STATE: BundleState = {
  openStep: 1,
  selectedVariants: {
    'wyze-cam-v4': 'white',
    'wyze-cam-pan-v3': 'white',
    'wyze-cam-floodlight-v2': 'white',
    'wyze-battery-cam-pro': 'white',
  },
  items: {
    'wyze-cam-v4': { white: 1, grey: 0, black: 0 },
    'wyze-cam-pan-v3': { white: 2, black: 0 },
    'wyze-cam-floodlight-v2': { white: 0, black: 0 },
    'wyze-duo-cam-doorbell': { [DEFAULT_VARIANT]: 0 },
    'wyze-battery-cam-pro': { white: 0, black: 0 },
    'cam-unlimited': { [DEFAULT_VARIANT]: 1 },
    'wyze-sense-motion-sensor': { [DEFAULT_VARIANT]: 2 },
    'wyze-sense-hub': { [DEFAULT_VARIANT]: 1 },
    'wyze-microsd-256gb': { [DEFAULT_VARIANT]: 2 },
  },
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useBundleStore = create<BundleStore>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      increaseQuantity: (productId, variantId) =>
        set((state) => ({
          items: {
            ...state.items,
            [productId]: {
              ...(state.items[productId] ?? {}),
              [variantId]: (state.items[productId]?.[variantId] ?? 0) + 1,
            },
          },
        })),

      decreaseQuantity: (productId, variantId) =>
        set((state) => {
          const current = state.items[productId]?.[variantId] ?? 0;
          if (current <= 0) return state;
          return {
            items: {
              ...state.items,
              [productId]: {
                ...(state.items[productId] ?? {}),
                [variantId]: current - 1,
              },
            },
          };
        }),

      selectVariant: (productId, variantId) =>
        set((state) => ({
          selectedVariants: {
            ...state.selectedVariants,
            [productId]: variantId,
          },
          // Ensure the variant key exists in items (default 0)
          items: {
            ...state.items,
            [productId]: {
              ...(state.items[productId] ?? {}),
              [variantId]: state.items[productId]?.[variantId] ?? 0,
            },
          },
        })),

      setOpenStep: (step) =>
        set((state) => ({
          openStep: state.openStep === step ? 0 : step,
        })),

      saveSystem: () => {
        // Persist middleware handles this automatically.
        // This action is a no-op trigger for UI feedback.
      },

      resetStore: () => set(INITIAL_STATE),
    }),
    {
      name: 'wyze-bundle-builder',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        selectedVariants: state.selectedVariants,
      }),
      // Gracefully handle corrupted persisted data
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.warn('Bundle store: failed to rehydrate, using defaults.', error);
        }
        if (state && !state.items) {
          Object.assign(state, INITIAL_STATE);
        }
      },
    }
  )
);

// ─── Selectors ────────────────────────────────────────────────────────────────

/** Total quantity across all variants for a product */
export function selectProductTotalQty(
  items: CartItems,
  productId: string
): number {
  const variantMap = items[productId];
  if (!variantMap) return 0;
  return Object.values(variantMap).reduce((sum, q) => sum + q, 0);
}

/** Quantity for a specific variant */
export function selectVariantQty(
  items: CartItems,
  productId: string,
  variantId: string
): number {
  return items[productId]?.[variantId] ?? 0;
}

/** Count of distinct selected products in a category */
export function selectCategorySelectedCount(
  items: CartItems,
  productIds: string[]
): number {
  return productIds.filter((id) => selectProductTotalQty(items, id) > 0).length;
}
