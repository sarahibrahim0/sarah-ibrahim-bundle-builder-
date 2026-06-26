import { Router } from 'express';
import { loadBundleData, getSteps, getContent } from '../models/bundleData.js';
import productRoutes from './products.js';

const router = Router();

router.use('/bundle-data/products', productRoutes);

router.get('/bundle-data', (_req, res) => {
  res.json(loadBundleData());
});

router.get('/bundle-data/steps', (_req, res) => {
  res.json(getSteps());
});

router.get('/bundle-data/content', (_req, res) => {
  res.json(getContent());
});

export default router;
