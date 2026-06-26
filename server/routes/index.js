import { Router } from 'express';
import {
  getAllBundleData,
  getBundleProducts,
  getBundleSteps,
  getBundleContent,
} from '../controllers/bundleController.js';

const router = Router();

router.get('/bundle-data', getAllBundleData);
router.get('/bundle-data/products', getBundleProducts);
router.get('/bundle-data/steps', getBundleSteps);
router.get('/bundle-data/content', getBundleContent);

export default router;
