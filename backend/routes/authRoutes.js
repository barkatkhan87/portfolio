import express from 'express';
import {
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
  checkAdmin,
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
import { avatar } from '../middlewares/uploadMiddleware.js';
import validate from '../middlewares/validationMiddleware.js';
import {
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
} from '../validations/authValidation.js';

const router = express.Router();

// Public routes
router.get('/check', checkAdmin);
router.post('/login', authLimiter, loginValidation, validate, login);

// Protected routes
router.use(protect);

router.post('/logout', logout);
router.get('/me', getMe);
router.put('/profile', avatar, updateProfileValidation, validate, updateProfile);
router.put('/password', changePasswordValidation, validate, changePassword);

export default router;