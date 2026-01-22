import express from 'express';

// Import route files
import authRoutes from './authRoutes.js';
import projectRoutes from './projectRoutes.js';
import skillRoutes from './skillRoutes.js';
import aboutRoutes from './aboutRoutes.js';
import messageRoutes from './messageRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/about', aboutRoutes);
router.use('/messages', messageRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;