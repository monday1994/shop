// component controller layer

import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UsersService from '../user/usersService';
import { encryptPassword, isPasswordValid } from '../../providers/encryptor';
import { UnAuthorizedError } from '../../app/exceptions/error';
import config from '../../config/default';
import {User} from '../../entities/User';

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
    delete user.refreshToken;

    if (isValid) {
      const token = jwt.sign({ ...user }, config.auth.tokenSecret, {
        expiresIn: config.auth.tokenExpire,
      });

      const refreshToken = jwt.sign({ id: user.id }, config.auth.refreshTokenSecret, {
        expiresIn: config.auth.refreshTokenExpire,
      });

      const encryptedRefreshToken = await encryptPassword(refreshToken);

      await this.usersService.updateRefreshToken(user.id, encryptedRefreshToken);

      res.status(200);
      res.json({
        data: {
          user,
          token,
          refreshToken,
        },
      });
    } else {
      throw new UnAuthorizedError('Wrong email or password');
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const [, refreshToken] = req.headers['authorization'].split('Bearer ');
    const user = <User> req.user;

    const { refreshToken: encryptedRefreshToken } = user;

    const isValid = await isPasswordValid(refreshToken, encryptedRefreshToken);

    if (isValid) {
      delete user.refreshToken;
      const token = jwt.sign({ ...user }, config.auth.tokenSecret, {
        expiresIn: config.auth.tokenExpire,
      });

      const newRefreshToken = jwt.sign({ id: user.id }, config.auth.refreshTokenSecret, {
        expiresIn: config.auth.refreshTokenExpire,
      });

      await this.usersService.updateRefreshToken(user.id, newRefreshToken)

      res.status(200);
      res.json({
        data: {
          token,
          refreshToken: newRefreshToken,
        },
      });
    } else {
      throw new UnAuthorizedError('Wrong refresh token');
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = <User> req.user;
    await this.usersService.updateRefreshToken(user.id, null);

    res.status(200);
    res.json({
      message: 'User logged out'
    });
  };
}
