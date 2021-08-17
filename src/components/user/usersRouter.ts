// component routing layer

import { Router } from 'express';
import UsersController from './usersController';
import UsersService from './usersService';
import UsersRepository from './usersRepository';
import { validate } from '../../middlewares/validator';
import { updateUserValidationRules, getByIdValidationRule } from './userValidator';
import { getRepository } from 'typeorm';
import { User } from '../../entities/User';

export default () => {
  const router = Router();

  const usersController = new UsersController(new UsersService(new UsersRepository(getRepository(User))));

  router.get('', usersController.getAll);
  router.get('/:id', getByIdValidationRule(), validate, usersController.getById);
  router.put('/:id', updateUserValidationRules(), validate, usersController.update);
  router.delete('/:id', getByIdValidationRule(), validate, usersController.delete);

  return router;
};
