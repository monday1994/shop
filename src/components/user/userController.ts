// component controller layer

import {Response, Request, NextFunction} from 'express';
import {getAll} from './usersService';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const allUsers = await getAll();
    console.log('some change');
    res.status(200);
    res.json( {
      results: allUsers
    });
  } catch (err) {
    next(err);
  }
};
