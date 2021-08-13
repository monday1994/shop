// component controller layer

import { Response, Request, NextFunction } from 'express';
import UsersService from './usersService';

export default class UsersController {
  constructor(private usersService: UsersService) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const users = await this.usersService.getAllUsers();

    res.status(200);
    res.json({
      data: {
        results: users,
      },
    });
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const user = await this.usersService.getUserById(id);
    res.status(200);
    res.json({ data: user });
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const user = {
      id,
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: email.toLowerCase(),
    };

    const updatedUser = await this.usersService.updateUser(user);
    res.status(200);
    res.json({
      data: updatedUser,
    });
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    await this.usersService.deleteById(id);

    res.status(204);
    res.send();
  };
}
