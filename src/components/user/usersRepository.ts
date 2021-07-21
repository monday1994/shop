// user database access layer

import {DeleteResult, getRepository} from 'typeorm';
import { User } from '../../entities/User';
import {UserInterface} from './userModel';

export default class UsersRepository {
  async findAll(): Promise<User[]> {
    return getRepository(User).find();
  }

  async findById(id: string): Promise<User> {
    return getRepository(User).findOne(id);
  }

  async create(user: UserInterface): Promise<User> {
    const usersRepository = getRepository(User);
    const {firstName, lastName, email, password} = user;

    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;

    //todo add crypto hash salt
    newUser.password = password;

    await usersRepository.save(newUser)

    return newUser;
  }

  async update(user: UserInterface): Promise<User> {
    const usersRepository = getRepository(User);

    const {id, firstName, lastName, email} = user;

    const userToUpdate = new User();

    userToUpdate.id = id;
    userToUpdate.firstName = firstName;
    userToUpdate.lastName = lastName;
    userToUpdate.email = email;

    await usersRepository.update({id}, userToUpdate);

    return userToUpdate;
  }

  async removeById(id: string): Promise<number> {
    const { affected } = await getRepository(User).delete({ id });
    return affected;
  }
}
