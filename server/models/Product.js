import { loadBundleData } from './bundleData.js';

export function getAllProducts() {
  return loadBundleData().products ?? [];
}

export function getProductById(id) {
  return getAllProducts().find((p) => p.id === id) ?? null;
}

export function getProductsByCategory(category) {
  return getAllProducts().filter((p) => p.category === category);
}

export function getMonthlyProducts() {
  return getAllProducts().filter((p) => p.isMonthly === true);
}

export function getFreeProducts() {
  return getAllProducts().filter((p) => p.isFree === true);
}
