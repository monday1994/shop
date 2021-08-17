// component routing layer

import { Router } from 'express';
import AuthController from './authController';
import { validate } from '../../middlewares/validator';
import UsersService from '../user/usersService';
import UsersRepository from '../user/usersRepository';
import { loginValidationRules, registerUserValidationRules } from '../user/userValidator';
import passport from 'passport';
import { getRepository } from 'typeorm';
import { User } from '../../entities/User';

export default () => {
  const router = Router();

  const authController = new AuthController(new UsersService(new UsersRepository(getRepository(User))));

  router.post('/register', registerUserValidationRules(), validate, authController.register);
  router.post('/login', loginValidationRules(), validate, authController.login);
  router.get('/logout', passport.authenticate('jwt-token', { session: false }), authController.logout);
  router.post('/refresh', passport.authenticate('jwt-refresh-token', { session: false }), authController.refresh);

  return router;
};
