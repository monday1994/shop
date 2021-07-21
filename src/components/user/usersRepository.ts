// user database access layer

import { getRepository } from 'typeorm';
import { User } from '../../entities/User';

export default class UsersRepository {
  async findAll(): Promise<User[]> {
    return getRepository(User).find();
  }

  async findById(id: string): Promise<User> {
    return getRepository(User).findOne(id);
  }
}
/*
q
export const create = async (newUser: User): Promise<User> => {
  const usersRepository = getRepository(User);
  let userEntity = new User();
  newUser = {
    ...newUser,
    firstName: 'Francis',
    lastName: 'Monday',
    email: 'francis.monday@gmail.com',
    password: 'somepass',
  }

  await usersRepository.save(newUser)

  return userEntity;
};
*/
