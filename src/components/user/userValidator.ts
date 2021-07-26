import { body, param } from 'express-validator';

const firstNameRule = body('firstName')
  .exists()
  .isAlpha()
  .isLength({ min: 2 })
  .withMessage('must be at least 2 chars long and contain only letters');

const lastNameRule = body('lastName')
  .exists()
  .isAlpha()
  .isLength({ min: 2 })
  .withMessage('must be at least 2 chars long and contain only letters');

const emailRule = body('email')
  .exists()
  .withMessage('must be at least 5 chars long and be email')
  .isEmail()
  .isLength({ min: 5 });

const passwordRule = body('password')
  .exists()
  .isLength({ min: 5 })
  .withMessage('must be at least 5 chars long');

export const createUserValidationRules = () => [
  // firstName must be an email
  firstNameRule,
  lastNameRule,
  emailRule,
  passwordRule,
];

export const updateUserValidationRules = () => [
  firstNameRule,
  lastNameRule,
  emailRule,
]

const idRule = param('id')
    .exists()
    .isUUID(4)
    .withMessage('id have to be uuid 4th version');

export const getByIdValidationRule = () => [
  idRule
];
