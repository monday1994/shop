//business logic layer

import {User} from '../../entities/User';
import UsersRepository from './usersRepository';
import {UserInterface} from './userModel';
import {NotFoundError} from '../../app/exceptions/error';

export default class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.findById(id);
  }

  async createUser(user: UserInterface): Promise<User> {
    return this.usersRepository.create(user);
  }

  async updateUser(user: UserInterface): Promise<User> {
    return this.usersRepository.update(user);
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
