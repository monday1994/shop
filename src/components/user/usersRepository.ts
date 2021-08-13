// user database access layer

import { getRepository } from 'typeorm';
import { User } from '../../entities/User';
import { UserDTO } from './userDTO';
import {ConflictError, GeneralPostgresError, NotFoundError} from '../../app/exceptions/error';

export default class UsersRepository {
  findAll(): Promise<User[]> {
    return getRepository(User).find();
  }

  findById(id: string): Promise<User> {
    return getRepository(User).findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    return getRepository(User).findOne({email});
  }

  async create(user: UserDTO): Promise<User> {
    const usersRepository = getRepository(User);
    const { firstName, lastName, email, password } = user;

    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = password;

    try {
      const createdUser = await usersRepository.save(newUser);
      return createdUser;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictError(`User with email: ${email} already exists`);
      } else if (err.code) {
        throw new GeneralPostgresError(err);
      } else {
        throw err;
      }
    }
  }

  async update(user: UserDTO): Promise<User | number> {
    const usersRepository = getRepository(User);

    const { id, firstName, lastName, email } = user;

    const userToUpdate = new User();

    userToUpdate.id = id;
    userToUpdate.firstName = firstName;
    userToUpdate.lastName = lastName;
    userToUpdate.email = email;

    try {
      const {affected} = await usersRepository.update({ id }, userToUpdate);

      if (affected > 0) {
        return userToUpdate;
      }

      throw new NotFoundError(`User with id: ${user.id} does not exist in db`);
    } catch (err) {
      if (err.code) {
        throw new GeneralPostgresError(err);
      } else {
        throw err;
      }
    }
  }

  async removeById(id: string): Promise<void> {
    const { affected } = await getRepository(User).delete({ id });
    if(affected > 0) {
      return;
    } else {
      throw new NotFoundError(`Cannot delete user with id: ${id}, because it does not exist in db`);
    }
  }
}
