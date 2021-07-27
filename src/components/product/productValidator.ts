import { body, param } from 'express-validator';

const nameRule = body('name')
  .exists()
  .isString()
  .isLength({ min: 2 })
  .withMessage('must be at least 2 chars long and contain only alphanumerics');

const descriptionRule = body('description')
  .exists()
  .isString()
  .isLength({ min: 25, max: 2000 })
  .withMessage('must be at least 25 and up to 2000 chars long and contain only alphanumerics');

const priceRule = body('price')
  .exists()
  .isFloat({min: 0, max: 10000000})
  .withMessage('must be at least 0 and up to 10000000')
  .isLength({ min: 1 });

const idRule = param('id')
  .exists()
  .isUUID(4)
  .withMessage('id have to be uuid 4th version');

export const createProductValidationRules = () => [
  // firstName must be an email
  nameRule,
  descriptionRule,
  priceRule
];

export const updateProductValidationRules = () => [
  idRule,
  nameRule,
  descriptionRule,
  priceRule
]

export const getByIdValidationRule = () => [
  idRule
];
