// backend/routes/saleProjectRoutes.js
import express from 'express';
import {
  getSaleProjects,
  getSaleProjectBySlug,
  getAdminSaleProjects,
  createSaleProject,
  updateSaleProject,
  deleteSaleProject,
} from '../controllers/saleProjectController.js';

import { protect, isAdmin } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validationMiddleware.js';
import { projectImages } from '../middlewares/uploadMiddleware.js';
import {
  createSaleProjectValidation,
  updateSaleProjectValidation,
  saleProjectIdValidation,
} from '../validations/saleProjectValidation.js';

const router = express.Router();

/**
 * Public routes
 */

// GET /api/sale-projects
router.get('/', getSaleProjects);

// 🔹 Public detail route that matches your frontend:
// GET /api/sale-projects/detail/:slug
router.get('/detail/:slug', getSaleProjectBySlug);

/**
 * Admin routes (protected)
 */

// GET /api/sale-projects/admin/all
router.get('/admin/all', protect, isAdmin, getAdminSaleProjects);

// POST /api/sale-projects
router.post(
  '/',
  protect,
  isAdmin,
  projectImages,
  createSaleProjectValidation,
  validate,
  createSaleProject
);

// PUT /api/sale-projects/:id
router.put(
  '/:id',
  protect,
  isAdmin,
  projectImages,
  updateSaleProjectValidation,
  validate,
  updateSaleProject
);

// DELETE /api/sale-projects/:id
router.delete(
  '/:id',
  protect,
  isAdmin,
  saleProjectIdValidation,
  validate,
  deleteSaleProject
);

export default router;