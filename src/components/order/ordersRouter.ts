// component routing layer

import { Router } from 'express';
import OrdersController from './ordersController';
import OrdersService from './ordersService';
import OrdersRepository from './ordersRepository';
import { validate } from '../../middlewares/validator';
import { createOrderValidationRules, updateOrderValidationRules, getByIdValidationRule } from './orderValidator';

const router = Router();

const ordersController = new OrdersController(new OrdersService(
  new OrdersRepository(),
));

router.get('/:id', getByIdValidationRule(), validate, ordersController.getById);
router.get('', ordersController.getAll);
router.post('', createOrderValidationRules(), validate, ordersController.create);
router.put('/:id', updateOrderValidationRules(), validate, ordersController.update);
router.delete('/:id', getByIdValidationRule(), validate, ordersController.delete);

export default router;
