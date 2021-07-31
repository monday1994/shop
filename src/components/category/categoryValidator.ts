import { body, param } from 'express-validator';

const nameRule = body('name')
  .exists()
  .isString()
  .isLength({ min: 2 })
  .withMessage('must be at least 2 chars long and contain only alphanumerics');

const idRule = param('id')
  .exists()
  .isUUID(4)
  .withMessage('id have to be uuid 4th version');

export const createCategoryValidationRules = () => [
  nameRule
];

export const updateCategoryValidationRules = () => [
  idRule,
  nameRule
]

export const getByIdValidationRule = () => [
  idRule
];
