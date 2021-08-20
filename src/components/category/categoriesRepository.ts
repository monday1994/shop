import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import { Category } from '../../entities/Category';
import { CategoryDTO } from './categoryDTO';
import { GeneralPostgresError, NotFoundError } from '../../app/exceptions/error';

//temp proposal for unit testing
interface CategoryRepository {
  findOne: (id: string) => Promise<Category>,
  find: () => Promise<Category[]>,
  save: (category: Category) => Promise<Category>,
  update: (cat: {id: string}, category: Category) => Promise<UpdateResult>,
  delete: (category: {id: string}) => Promise<DeleteResult>
}

export default class CategoriesRepository {
  // repository: Repository<Category> -> temp commented should be in constructor
  constructor(private repository: CategoryRepository) {}

  async findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Category> {
    return this.repository.findOne(id);
  }

  async create(category: CategoryDTO): Promise<Category> {
    const { name } = category;

    const newCategory = new Category();
    newCategory.name = name;

    try {
      const createdCategory = await this.repository.save(newCategory);

      return createdCategory;
    } catch (err) {
      if (err.code) {
        throw new GeneralPostgresError(err);
      } else {
        throw err;
      }
    }
  }

  async update(category: CategoryDTO): Promise<Category> {
    const { id, name } = category;

    const categoryToUpdate = new Category();
    categoryToUpdate.id = id;
    categoryToUpdate.name = name;

    try {
      const { affected } = await this.repository.update({ id }, categoryToUpdate);

      if (affected > 0) {
        return categoryToUpdate;
      }

      throw new NotFoundError(`Category with id: ${id} does not exist in db`);
    } catch (err) {
      if (err.code) {
        throw new GeneralPostgresError(err);
      } else {
        throw err;
      }
    }
  }

  async removeById(id: string): Promise<void> {
    try {
      const { affected } = await this.repository.delete({ id });

      if (affected > 0) {
        return;
      }
      throw new NotFoundError(`Cannot delete category with id: ${id}, because it does not exist in db`);
    } catch (err) {
      if (err.code) {
        throw new GeneralPostgresError(err);
      } else {
        throw err;
      }
    }
  }
}
