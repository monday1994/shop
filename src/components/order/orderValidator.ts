import {body, check, param} from 'express-validator';
import { validate as uuidValidate } from 'uuid';

const nameRule = body('name')
  .exists()
  .isString()
  .isLength({ min: 2 })
  .withMessage('must be at least 2 chars long and contain only alphanumerics');

const priceRule = body('price')
  .exists()
  .isString()
  .isLength({min: 1})
  .withMessage('price have to be defined string')

const addressRule = body('address')
  .exists()
  .isPostalCode('PL')
  .withMessage('address have to be postal')

const productsIdsRule = body('productsIds').custom(ids => {
  if(!Array.isArray(ids) || ids.some(item => !uuidValidate(item))) {
    return Promise.reject('Invalid product id, must be uuid v4');
  } else {
    return Promise.resolve()
  }
})

const userIdRule = body('userId')
  .exists()
  .isString()
  .isUUID(4)

const idRule = param('id')
  .exists()
  .isUUID(4)
  .withMessage('id have to be uuid 4th version');

export const createOrderValidationRules = () => [
  nameRule,
  priceRule,
  addressRule,
  productsIdsRule,
  userIdRule
];

export const updateOrderValidationRules = () => [
  idRule,
  nameRule,
  priceRule,
  addressRule,
  productsIdsRule,
  userIdRule
]

export const getByIdValidationRule = () => [
  idRule
];
