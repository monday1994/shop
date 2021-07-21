// component routing layer

import { Router } from 'express';
import UserController from './userController';
import UsersService from './usersService';
import UsersRepository from './usersRepository';

const router = Router();

const userController = new UserController(new UsersService(new UsersRepository()));

router.get('', userController.getAll);

export default router;
