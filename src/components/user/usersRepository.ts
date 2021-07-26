// user database access layer

import { getRepository } from 'typeorm';
import { User } from '../../entities/User';
import { UserInterface } from './userModel';
import { ConflictError } from '../../app/exceptions/error';

export default class UsersRepository {
  async findAll(): Promise<User[]> {
    return getRepository(User).find();
  }

  async findById(id: string): Promise<User> {
    return getRepository(User).findOne(id);
  }

  async create(user: UserInterface): Promise<User> {
    const usersRepository = getRepository(User);
    const { firstName, lastName, email, password } = user;

    const newUser = new User();
    newUser.firstName = firstName.toLowerCase();
    newUser.lastName = lastName.toLowerCase();
    newUser.email = email.toLowerCase();

    //todo add crypto hash salt
    newUser.password = password;

    try {
      await usersRepository.save(newUser);

      return newUser;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictError(`User with email: ${email} already exists`);
      } else {
        throw err;
      }
    }
  }

  async update(user: UserInterface): Promise<User> {
    const usersRepository = getRepository(User);

    const { id, firstName, lastName, email } = user;

    const userToUpdate = new User();

    userToUpdate.id = id;
    userToUpdate.firstName = firstName.toLowerCase();
    userToUpdate.lastName = lastName.toLowerCase();
    userToUpdate.email = email.toLowerCase();

    try {
      await usersRepository.update({ id }, userToUpdate);

      return userToUpdate;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictError(`User with email: ${email} already exists`);
      } else {
        throw err;
      }
    }
  }

  async removeById(id: string): Promise<number> {
    const { affected } = await getRepository(User).delete({ id });
    return affected;
  }
}
