// component controller layer

import { Response, Request, NextFunction } from 'express';
import UsersService from './usersService';

export default class UserController {

  constructor(private usersService: UsersService) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.usersService.getAllUsers();
      res.status(200);
      res.json({
        results: users,
      });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.body;

      const user = await this.usersService.getUserById(id);
      res.status(200);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { firstName, lastName, email, password } = req.body;
      /*    const usersRepository = getRepository(User);
      let newUser = new User();
      newUser = {
        ...newUser,
        firstName: 'Francis',
        lastName: 'Monday',
        email: 'francis.monday@gmail.com',
        password: 'somepass',
      }
      
      await usersRepository.save(newUser);*/
    } catch (err) {
      next(err);
    }
  }
}
