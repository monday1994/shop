import { body } from 'express-validator';

export const userValidationRules = () => {
  return [
    // firstName must be an email
    body('firstName').isAlpha().isLength({ min: 2 }),
    body('lastName').isAlpha().isLength({ min: 2 }),
    body('email').isEmail().isLength({ min: 5 }),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
  ];
};
