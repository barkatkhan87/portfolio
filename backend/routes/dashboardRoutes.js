import express from 'express';
import {
  getDashboardStats,
  getRecentActivity,
} from '../controllers/dashboardController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All dashboard routes require admin authentication
router.use(protect, isAdmin);

router.get('/stats', getDashboardStats);
router.get('/activity', getRecentActivity);

export default router;