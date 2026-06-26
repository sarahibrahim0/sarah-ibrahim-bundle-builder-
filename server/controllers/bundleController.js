import { loadBundleData, getProducts, getSteps, getContent } from '../models/bundleData.js';

export function getAllBundleData(_req, res) {
  const data = loadBundleData();
  res.json(data);
}

export function getBundleProducts(_req, res) {
  res.json(getProducts());
}

export function getBundleSteps(_req, res) {
  res.json(getSteps());
}

export function getBundleContent(_req, res) {
  res.json(getContent());
}
