// user database access layer

import { User } from './userModel';

//temporary variable
const users = [{id:6, name: 'John2'}, {id:2, name: 'John2'}, {id:4, name: 'John2'}];

export const findAllUsers = async (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};
