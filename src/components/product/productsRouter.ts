// component routing layer

import { Router } from 'express';
import ProductsController from './productsController';
import ProductsService from './productsService';
import ProductsRepository from './productsRepository';
import { validate } from '../../middlewares/validator';
import { createProductValidationRules, updateProductValidationRules, getByIdValidationRule } from './productValidator';

const router = Router();

const productsController = new ProductsController(new ProductsService(new ProductsRepository()));

router.get('', productsController.getAll);
router.get('/:id', getByIdValidationRule(), validate, productsController.getById);
router.post('', createProductValidationRules(), validate, productsController.create);
router.put('/:id', updateProductValidationRules(), validate, productsController.update);
router.delete('/:id', getByIdValidationRule(), validate, productsController.delete);

export default router;
