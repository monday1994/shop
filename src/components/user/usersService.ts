//business logic layer

import {User} from './userModel';
import {findAllUsers} from './usersRepository';

export const getAll = (): Promise<User[]> => {
  return findAllUsers();
};
