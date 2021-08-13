import { getRepository } from 'typeorm';
import { Category } from '../../entities/Category';
import { CategoryDTO } from './categoryDTO';
import { GeneralPostgresError, NotFoundError } from '../../app/exceptions/error';

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

    try {
      const createdCategory = await repository.save(newCategory);

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
    const productsRepository = getRepository(Category);

    const { id, name } = category;

    const categoryToUpdate = new Category();
    categoryToUpdate.id = id;
    categoryToUpdate.name = name;

    try {
      const { affected } = await productsRepository.update({ id }, categoryToUpdate);

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
      const { affected } = await getRepository(Category).delete({ id });

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
