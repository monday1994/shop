// component controller layer

import { Response, Request, NextFunction } from 'express';
import UsersService from './usersService';

export default class UsersController {
  constructor(private usersService: UsersService) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.usersService.getAllUsers();
      res.status(200);
      res.json({
        data: {
          results: users,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.body;

      const user = await this.usersService.getUserById(id);
      res.status(200);
      res.json({ data: user });
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const newUser = {
        firstName,
        lastName,
        email,
        password
      };

      const createdUser = await this.usersService.createUser(newUser);
      res.status(201);
      res.json({
        data: createdUser,
      });
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
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
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      const deletedRows = await this.usersService.deleteById(id);
      
      if(deletedRows > 0) {
        res.status(204);
        res.send();
      } else {
        res.status(400);
        res.json({
          message: `There is no row with id: ${id}`
        });
      }
    } catch (err) {
      next(err);
    }
  };
}
