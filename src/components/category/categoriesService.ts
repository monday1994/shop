import CategoriesRepository from './categoriesRepository';
import {CategoryInterface} from './categoryModel';
import {NotFoundError} from '../../app/exceptions/error';
import {Category} from '../../entities/Category';

export default class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
  }

  async createCategory(category: CategoryInterface): Promise<Category> {
    return this.categoriesRepository.create(category);
  }

  async updateCategory(category: CategoryInterface): Promise<Category | number> {
    const result = await this.categoriesRepository.update(category);

    if(typeof result !== 'number') {
      return result;
    } else {
      throw new NotFoundError(`Category with id: ${category.id} does not exist in db`);
    }
  }

  async deleteById(id: string): Promise<number> {
    const affectedRows = await this.categoriesRepository.removeById(id);

    if(affectedRows > 0) {
      return;
    } else {
      throw new NotFoundError(`Cannot delete category with id: ${id}, because it does not exist in db`);
    }
  }
}
