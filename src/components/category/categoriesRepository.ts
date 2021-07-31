import { getRepository } from 'typeorm';
import {Category} from '../../entities/Category';
import { CategoryDTO } from './categoryDTO';
import { GeneralPostgresError } from '../../app/exceptions/error';
import { getTimestamp } from '../../utils/utils';

export default class CategoriesRepository {
  async findAll(): Promise<Category[]> {
    return getRepository(Category).find();
  }

  async findById(id: string): Promise<Category> {
    return getRepository(Category).findOne(id);
  }

  async create(category: CategoryDTO): Promise<Category> {
    const repository = getRepository(Category);
    const { name } = category;

    const newCategory = new Category();
    newCategory.name = name;
    newCategory.createdAt = getTimestamp();
    newCategory.updatedAt = getTimestamp();

    try {
      await repository.save(newCategory);

      return newCategory;
    } catch (err) {
      if (err.code) {
        throw new GeneralPostgresError(`Db error with code: ${err.code}`);
      } else {
        throw err;
      }
    }
  }

  async update(category: CategoryDTO): Promise<Category | number> {
    const productsRepository = getRepository(Category);

    const { id, name } = category;

    const categoryToUpdate = new Category();

    categoryToUpdate.name = name;
    categoryToUpdate.updatedAt = getTimestamp();

    try {
      const { affected } = await productsRepository.update({ id }, categoryToUpdate);

      if (affected > 0) {
        return categoryToUpdate;
      }

      return affected;
    } catch (err) {
      if (err.code) {
        throw new GeneralPostgresError(`Db error with code: ${err.code}`);
      } else {
        throw err;
      }
    }
  }

  async removeById(id: string): Promise<number> {
    const { affected } = await getRepository(Category).delete({ id });
    return affected;
  }
}
