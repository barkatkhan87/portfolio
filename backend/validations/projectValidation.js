import { body, param } from 'express-validator';

const allowedCategories = ['web', 'mobile', 'desktop', 'api', 'other'];
const allowedStatus = ['completed', 'in-progress', 'planned'];

// ✅ Accept array OR comma-separated string (multipart)
const technologiesValidator = body('technologies')
  .optional({ nullable: true })
  .custom((value) => {
    if (Array.isArray(value)) return true;
    if (typeof value === 'string') return true;
    return false;
  })
  .withMessage('Technologies must be an array or a comma-separated string');

// ✅ Accept boolean or "true"/"false" strings (multipart)
const featuredValidator = body('featured')
  .optional({ nullable: true })
  .custom((value) => {
    if (typeof value === 'boolean') return true;
    if (typeof value === 'string' && ['true', 'false'].includes(value.toLowerCase())) return true;
    return false;
  })
  .withMessage('Featured must be a boolean');

// ✅ Accept int or numeric string (multipart)
const orderValidator = body('order')
  .optional({ nullable: true })
  .custom((value) => {
    if (typeof value === 'number' && Number.isInteger(value) && value >= 0) return true;
    if (typeof value === 'string' && value.trim() !== '' && Number.isInteger(Number(value)) && Number(value) >= 0) return true;
    return false;
  })
  .withMessage('Order must be a positive integer');

export const createProjectValidation = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),

  body('description')
    .notEmpty().withMessage('Description is required')
    .trim()
    .isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),

  body('longDescription')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 2000 }).withMessage('Long description cannot exceed 2000 characters'),

  technologiesValidator,

  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(allowedCategories).withMessage('Invalid category'),

  body('liveUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isURL().withMessage('Please enter a valid URL'),

  body('githubUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isURL().withMessage('Please enter a valid GitHub URL'),

  featuredValidator,

  body('status')
    .optional({ nullable: true })
    .isIn(allowedStatus).withMessage('Invalid status'),

  orderValidator,
];

export const updateProjectValidation = [
  param('id').isMongoId().withMessage('Invalid project ID'),

  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),

  body('longDescription')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 2000 }).withMessage('Long description cannot exceed 2000 characters'),

  technologiesValidator,

  body('category')
    .optional()
    .isIn(allowedCategories).withMessage('Invalid category'),

  body('liveUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isURL().withMessage('Please enter a valid URL'),

  body('githubUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isURL().withMessage('Please enter a valid GitHub URL'),

  featuredValidator,

  body('status')
    .optional({ nullable: true })
    .isIn(allowedStatus).withMessage('Invalid status'),

  orderValidator,
];

export const projectIdValidation = [
  param('id').isMongoId().withMessage('Invalid project ID'),
];