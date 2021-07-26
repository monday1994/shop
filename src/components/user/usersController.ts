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
    const { id } = req.body;

    const user = await this.usersService.getUserById(id);
    res.status(200);
    res.json({ data: user });
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { firstName, lastName, email, password } = req.body;
    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    const createdUser = await this.usersService.createUser(newUser);
    res.status(201);
    res.json({
      data: createdUser,
    });
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const user = {
      id,
      firstName,
      lastName,
      email,
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
