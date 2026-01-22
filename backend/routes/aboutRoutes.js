import express from 'express';
import {
  getAbout,
  updateAbout,
  updateAvatar,
  updateResume,
  addExperience,
  updateExperience,
  deleteExperience,
  addEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/aboutController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';
import { avatar, resume } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAbout);

// Admin routes
router.use(protect, isAdmin);

router.put('/', updateAbout);
router.put('/avatar', avatar, updateAvatar);
router.put('/resume', resume, updateResume);

// Experience routes
router.post('/experience', addExperience);
router.put('/experience/:expId', updateExperience);
router.delete('/experience/:expId', deleteExperience);

// Education routes
router.post('/education', addEducation);
router.put('/education/:eduId', updateEducation);
router.delete('/education/:eduId', deleteEducation);

export default router;