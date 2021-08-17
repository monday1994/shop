// component routing layer

import { Router } from 'express';
import CategoriesController from './categoriesController';
import CategoriesService from './categoriesService';
import CategoriesRepository from './categoriesRepository';
import { validate } from '../../middlewares/validator';
import {
  createCategoryValidationRules,
  updateCategoryValidationRules,
  getByIdValidationRule,
} from './categoryValidator';
import { getRepository } from 'typeorm';
import { Category } from '../../entities/Category';

export default () => {
  const router = Router();

  const categoriesController = new CategoriesController(
    new CategoriesService(new CategoriesRepository(getRepository(Category))),
  );

  router.get('', categoriesController.getAll);
  router.post('', createCategoryValidationRules(), validate, categoriesController.create);
  router.put('/:id', updateCategoryValidationRules(), validate, categoriesController.update);
  router.delete('/:id', getByIdValidationRule(), validate, categoriesController.delete);

  return router;
};
