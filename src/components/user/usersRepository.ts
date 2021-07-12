// user database access layer

import { User } from './userModel';

//temporary variable
const users = [{id:1, name: 'John'}];

export const findAllUsers = async (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};
