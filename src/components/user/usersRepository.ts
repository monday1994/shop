// user database access layer

import { getRepository } from 'typeorm';
import { User } from '../../entities/User';
import { UserDTO } from './userDTO';
import { ConflictError, GeneralPostgresError } from '../../app/exceptions/error';
import { getTimestamp } from '../../utils/utils';

export default class UsersRepository {
  async findAll(): Promise<User[]> {
    return getRepository(User).find();
  }

  async findById(id: string): Promise<User> {
    return getRepository(User).findOne(id);
  }

  async create(user: UserDTO): Promise<User> {
    const usersRepository = getRepository(User);
    const { firstName, lastName, email, password } = user;

    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;

    //todo add crypto hash salt
    newUser.password = password;

    newUser.createdAt = getTimestamp();
    newUser.updatedAt = getTimestamp();

    try {
      await usersRepository.save(newUser);

      return newUser;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictError(`User with email: ${email} already exists`);
      } else if (err.code) {
        throw new GeneralPostgresError(`Db error with code: ${err.code}`);
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
    userToUpdate.updatedAt = getTimestamp();

    try {
      const {affected} = await usersRepository.update({ id }, userToUpdate);

      if (affected > 0) {
        return userToUpdate;
      }

      return affected;
    } catch (err) {
      if (err.code === '23505') {
        //todo https://www.npmjs.com/package/postgres-error-codes
        throw new ConflictError(`User with email: ${email} already exists`);
      } else if (err.code) {
        throw new GeneralPostgresError(`Db error with code: ${err.code}`);
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
