// component controller layer

import { Response, Request, NextFunction } from 'express';
import CategoriesService from './categoriesService';

export default class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const products = await this.categoriesService.getAllCategories();

    res.status(200);
    res.json({
      data: {
        results: products,
      },
    });
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body;
    const newCategory = {
      name: name.toLowerCase()
    };

    const createdCategory = await this.categoriesService.createCategory(newCategory);
    res.status(201);
    res.json({
      data: createdCategory,
    });
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { name } = req.body;

    const category = {
      id,
      name: name.toLowerCase()
    };

    const updatedCategory = await this.categoriesService.updateCategory(category);
    res.status(200);
    res.json({
      data: updatedCategory,
    });
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    await this.categoriesService.deleteById(id);

    res.status(204);
    res.send();
  };
}
