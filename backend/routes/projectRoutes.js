import express from 'express';
import {
  getProjects,
  getAdminProjects,
  getProject,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  toggleVisibility,
  toggleFeatured,
  getFeaturedProjects,
} from '../controllers/projectController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';
import { projectImages } from '../middlewares/uploadMiddleware.js';
import validate from '../middlewares/validationMiddleware.js';
import {
  createProjectValidation,
  updateProjectValidation,
  projectIdValidation,
} from '../validations/projectValidation.js';

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:slug', getProject);

// Admin routes
router.use(protect, isAdmin);

router.get('/admin/all', getAdminProjects);
router.get('/id/:id', projectIdValidation, validate, getProjectById);

router.post(
  '/',
  projectImages,
  createProjectValidation,
  validate,
  createProject
);

router.put(
  '/:id',
  projectImages,
  updateProjectValidation,
  validate,
  updateProject
);

router.delete('/:id', projectIdValidation, validate, deleteProject);

router.patch('/:id/visibility', projectIdValidation, validate, toggleVisibility);
router.patch('/:id/featured', projectIdValidation, validate, toggleFeatured);

export default router;