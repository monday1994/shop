//business logic layer

import {User} from '../../entities/User';
import UsersRepository from './usersRepository';

export default class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.findById(id);
  }
}
