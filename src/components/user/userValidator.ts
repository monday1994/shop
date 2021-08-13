import { body, param } from 'express-validator';

const firstNameRule = body('firstName')
  .exists()
  .isString()
  .isLength({ min: 2 })
  .withMessage('must be at least 2 chars long and contain only letters');

const lastNameRule = body('lastName')
  .exists()
  .isString()
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

const idRule = param('id')
  .exists()
  .isUUID(4)
  .withMessage('id have to be uuid 4th version');

export const loginValidationRules = () => [
  emailRule,
  passwordRule
]


export const registerUserValidationRules = () => [
  // firstName must be an email
  firstNameRule,
  lastNameRule,
  emailRule,
  passwordRule,
];

export const updateUserValidationRules = () => [
  idRule,
  firstNameRule,
  lastNameRule,
  emailRule,
]

export const getByIdValidationRule = () => [
  idRule
];
