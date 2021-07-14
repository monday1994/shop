// component controller layer

import {Response, Request, NextFunction} from 'express';
import {getAll} from './usersService';
import {getRepository} from 'typeorm';
import {User} from '../../entities/User';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
   // const allUsers = await getAll();
    const usersRepository = getRepository(User);
    let newUser = new User();
    newUser = {
      ...newUser,
      firstName: 'Francis',
      lastName: 'Monday',
      email: 'francis.monday@gmail.com',
      password: 'somepass',
    }

    await usersRepository.save(newUser);
    res.status(200);
    res.json( {
      results: newUser
    });
  } catch (err) {
    next(err);
  }
};
