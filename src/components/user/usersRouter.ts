// component routing layer

import { Router } from 'express';
import UsersController from './usersController';
import UsersService from './usersService';
import UsersRepository from './usersRepository';

const router = Router();

const usersController = new UsersController(new UsersService(new UsersRepository()));

router.get('', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);

export default router;
