import express from 'express';
import {
  getSkills,
  getAdminSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
  toggleVisibility,
  reorderSkills,
} from '../controllers/skillController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validationMiddleware.js';
import {
  createSkillValidation,
  updateSkillValidation,
  skillIdValidation,
} from '../validations/skillValidation.js';

const router = express.Router();

// Public routes
router.get('/', getSkills);

// Admin routes
router.use(protect, isAdmin);

router.get('/admin/all', getAdminSkills);
router.get('/:id', skillIdValidation, validate, getSkill);
router.post('/', createSkillValidation, validate, createSkill);
router.put('/reorder', reorderSkills);
router.put('/:id', updateSkillValidation, validate, updateSkill);
router.delete('/:id', skillIdValidation, validate, deleteSkill);
router.patch('/:id/visibility', skillIdValidation, validate, toggleVisibility);

export default router;