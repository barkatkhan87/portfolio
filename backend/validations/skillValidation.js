import { body, param } from 'express-validator';

export const createSkillValidation = [
  body('name')
    .notEmpty()
    .withMessage('Skill name is required')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Name must be between 1 and 50 characters'),
  
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['frontend', 'backend', 'database', 'devops', 'tools', 'other'])
    .withMessage('Invalid category'),
  
  body('proficiency')
    .notEmpty()
    .withMessage('Proficiency is required')
    .isInt({ min: 0, max: 100 })
    .withMessage('Proficiency must be between 0 and 100'),
  
  body('icon')
    .optional()
    .trim(),
  
  body('color')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Please enter a valid hex color'),
  
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a positive integer'),
];

export const updateSkillValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid skill ID'),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Name must be between 1 and 50 characters'),
  
  body('category')
    .optional()
    .isIn(['frontend', 'backend', 'database', 'devops', 'tools', 'other'])
    .withMessage('Invalid category'),
  
  body('proficiency')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Proficiency must be between 0 and 100'),
];

export const skillIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid skill ID'),
];