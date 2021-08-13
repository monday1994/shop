//business logic layer

import {User} from '../../entities/User';
import UsersRepository from './usersRepository';
import {UserDTO} from './userDTO';

export default class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  getUserById(id: string): Promise<User> {
    return this.usersRepository.findById(id);
  }

  createUser(user: UserDTO): Promise<User> {
    return this.usersRepository.create(user);
  }

  updateUser(user: UserDTO): Promise<User | number> {
    return this.usersRepository.update(user);
  }

  deleteById(id: string): Promise<void> {
    return this.usersRepository.removeById(id);
  }
}
