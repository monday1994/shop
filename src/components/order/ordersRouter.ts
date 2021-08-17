// component routing layer

import { Router } from 'express';
import OrdersController from './ordersController';
import OrdersService from './ordersService';
import OrdersRepository from './ordersRepository';
import { validate } from '../../middlewares/validator';
import { createOrderValidationRules, updateOrderValidationRules, getByIdValidationRule } from './orderValidator';
import {Order} from '../../entities/Order';
import {getManager, getRepository} from 'typeorm';

export default () => {
  const router = Router();

  const ordersController = new OrdersController(new OrdersService(
    new OrdersRepository(getRepository(Order), getManager()),
  ));

  router.get('/:id', getByIdValidationRule(), validate, ordersController.getById);
  router.get('', ordersController.getAll);
  router.post('', createOrderValidationRules(), validate, ordersController.create);
  router.put('/:id', updateOrderValidationRules(), validate, ordersController.update);
  router.delete('/:id', getByIdValidationRule(), validate, ordersController.delete);

  return router;
}
