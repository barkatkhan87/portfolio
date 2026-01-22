import { body, param, query } from 'express-validator';

export const createMessageValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),
  
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  
  body('subject')
    .notEmpty()
    .withMessage('Subject is required')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Subject must be between 3 and 200 characters')
    .escape(),
  
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
];

export const messageIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid message ID'),
];

export const updateMessageStatusValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid message ID'),
  
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['unread', 'read', 'replied', 'archived'])
    .withMessage('Invalid status'),
];

export const getMessagesValidation = [
  query('status')
    .optional()
    .isIn(['unread', 'read', 'replied', 'archived', 'all'])
    .withMessage('Invalid status filter'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];