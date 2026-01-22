import express from 'express';
import {
  createMessage,
  getMessages,
  getMessage,
  updateMessageStatus,
  toggleStar,
  deleteMessage,
  deleteMultipleMessages,
  markMultipleAsRead,
} from '../controllers/messageController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';
import { contactLimiter } from '../middlewares/rateLimiter.js';
import validate from '../middlewares/validationMiddleware.js';
import {
  createMessageValidation,
  messageIdValidation,
  updateMessageStatusValidation,
  getMessagesValidation,
} from '../validations/messageValidation.js';

const router = express.Router();

// Public routes
router.post(
  '/',
  contactLimiter,
  createMessageValidation,
  validate,
  createMessage
);

// Admin routes
router.use(protect, isAdmin);

router.get('/', getMessagesValidation, validate, getMessages);
router.get('/:id', messageIdValidation, validate, getMessage);
router.patch('/:id/status', updateMessageStatusValidation, validate, updateMessageStatus);
router.patch('/:id/star', messageIdValidation, validate, toggleStar);
router.delete('/:id', messageIdValidation, validate, deleteMessage);
router.delete('/', deleteMultipleMessages);
router.patch('/mark-read', markMultipleAsRead);

export default router;