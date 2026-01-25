// backend/validations/saleProjectValidation.js
import { body, param } from 'express-validator';

const allowedCategories = ['react',
  'angular',
  'java',
  'dotnet',
  'csharp',
  'node',
  'python',
  'other',
];
const allowedCurrencies = ['INR', 'USD'];

const allowArrayOrString = (field, msg) =>
  body(field)
    .optional({ nullable: true })
    .custom((value) => Array.isArray(value) || typeof value === 'string')
    .withMessage(msg);

export const createSaleProjectValidation = [
  body('title').notEmpty().withMessage('Title is required').trim(),

  body('shortDescription')
    .notEmpty()
    .withMessage('Short description is required')
    .trim()
    .isLength({ max: 300 })
    .withMessage('Short description cannot exceed 300 characters'),

  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Description cannot exceed 5000 characters'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .custom((v) => !Number.isNaN(Number(v)) && Number(v) >= 0)
    .withMessage('Price must be a valid number >= 0'),

  body('currency')
    .optional()
    .isIn(allowedCurrencies)
    .withMessage('Invalid currency'),

  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(allowedCategories)
    .withMessage('Invalid category'),

  allowArrayOrString('technologies', 'Technologies must be an array or comma-separated string'),
  allowArrayOrString('features', 'Features must be an array or newline-separated string'),
  allowArrayOrString('includes', 'Includes must be an array or newline-separated string'),

  body('demoUrl')
    .optional({ values: 'falsy' })
    .isURL()
    .withMessage('Invalid demo URL'),

  body('githubUrl')
    .optional({ values: 'falsy' })
    .isURL()
    .withMessage('Invalid GitHub URL'),

  body('contactUrl')
    .optional({ values: 'falsy' })
    .isURL()
    .withMessage('Invalid contact URL'),
];

export const updateSaleProjectValidation = [
  param('id').isMongoId().withMessage('Invalid sale project ID'),

  // same fields but all optional
  body('title').optional().trim(),

  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Short description cannot exceed 300 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Description cannot exceed 5000 characters'),

  body('price')
    .optional()
    .custom((v) => !Number.isNaN(Number(v)) && Number(v) >= 0)
    .withMessage('Price must be a valid number >= 0'),

  body('currency')
    .optional()
    .isIn(allowedCurrencies)
    .withMessage('Invalid currency'),

  body('category')
    .optional()
    .isIn(allowedCategories)
    .withMessage('Invalid category'),

  allowArrayOrString('technologies', 'Technologies must be an array or comma-separated string'),
  allowArrayOrString('features', 'Features must be an array or newline-separated string'),
  allowArrayOrString('includes', 'Includes must be an array or newline-separated string'),

  body('demoUrl')
    .optional({ values: 'falsy' })
    .isURL()
    .withMessage('Invalid demo URL'),

  body('githubUrl')
    .optional({ values: 'falsy' })
    .isURL()
    .withMessage('Invalid GitHub URL'),

  body('contactUrl')
    .optional({ values: 'falsy' })
    .isURL()
    .withMessage('Invalid contact URL'),
];

export const saleProjectIdValidation = [
  param('id').isMongoId().withMessage('Invalid sale project ID'),
];