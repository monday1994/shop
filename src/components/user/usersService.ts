//business logic layer

import {User} from '../../entities/User';
import UsersRepository from './usersRepository';
import {UserDTO} from './userDTO';
import {NotFoundError} from '../../app/exceptions/error';

export default class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.findById(id);
  }

  async createUser(user: UserDTO): Promise<User> {
    return this.usersRepository.create(user);
  }

  async updateUser(user: UserDTO): Promise<User | number> {
    const result = await this.usersRepository.update(user);

    if(typeof result !== 'number') {
      return result;
    }

    throw new NotFoundError(`User with id: ${user.id} does not exist in db`);
  }

  async deleteById(id: string): Promise<number> {
    const affectedRows = await this.usersRepository.removeById(id);

    if(affectedRows > 0) {
      return;
    } else {
      throw new NotFoundError(`Cannot delete user with id: ${id}, because it does not exist in db`);
    }
  }
}
