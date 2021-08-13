// component controller layer

import { Response, Request, NextFunction } from 'express';
import UsersService from '../user/usersService';
import {encryptPassword, isPasswordValid} from '../../providers/encryptor';
import {UnAuthorizedError} from '../../app/exceptions/error';

export default class AuthController {
  constructor(private usersService: UsersService) {}

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { firstName, lastName, email, password } = req.body;

    const encryptedPassword = await encryptPassword(password);
    const newUser = {
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: email.toLowerCase(),
      password: encryptedPassword,
    };

    const createdUser = await this.usersService.createUser(newUser);
    delete createdUser.password;

    res.status(201);
    res.json({
      data: createdUser,
    });
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    const user = await this.usersService.getByEmail(email);

    const isValid = await isPasswordValid(password, user.password);

    delete user.password;

    if(isValid) {
      res.status(200);
      res.json({
        data: user
      })
    } else {
      throw new UnAuthorizedError('Wrong email or password');
    }
  };
}
