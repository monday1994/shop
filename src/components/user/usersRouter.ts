// component routing layer

import { Router } from 'express';
import UsersController from './usersController';
import UsersService from './usersService';
import UsersRepository from './usersRepository';
import { validate } from '../../middlewares/validator';
import { createUserValidationRules, updateUserValidationRules, getByIdValidationRule } from './userValidator';

const router = Router();

const usersController = new UsersController(new UsersService(new UsersRepository()));

router.get('', usersController.getAll);
router.get('/:id', getByIdValidationRule(), validate, usersController.getById);
router.post('', createUserValidationRules(), validate, usersController.create);
router.put('/:id', getByIdValidationRule(), updateUserValidationRules(), validate, usersController.update);
router.delete('/:id', getByIdValidationRule(), validate, usersController.delete);

export default router;
