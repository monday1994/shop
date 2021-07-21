//business logic layer

import {User} from '../../entities/User';
import UsersRepository from './usersRepository';
import {UserInterface} from './userModel';

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
    throw {message: 'Chuj', status: 400};
    return this.usersRepository.removeById(id);
  }
}
