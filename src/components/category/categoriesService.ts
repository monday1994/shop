import CategoriesRepository from './categoriesRepository';
import {CategoryDTO} from './categoryDTO';
import {Category} from '../../entities/Category';

export default class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  getAllCategories(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
  }

  createCategory(category: CategoryDTO): Promise<Category> {
    return this.categoriesRepository.create(category);
  }

  updateCategory(category: CategoryDTO): Promise<Category> {
    return this.categoriesRepository.update(category);
  }

  deleteById(id: string): Promise<void> {
    return this.categoriesRepository.removeById(id);
  }
}
