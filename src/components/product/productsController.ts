// component controller layer

import { Response, Request, NextFunction } from 'express';
import ProductsService from './productsService';

export default class ProductsController {
  constructor(private productsService: ProductsService) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const products = await this.productsService.getAllProducts();

    res.status(200);
    res.json({
      data: {
        results: products,
      },
    });
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const product = await this.productsService.getProductById(id);


    res.status(200);
    res.json({ data: product });
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, description, price } = req.body;
    const newProduct = {
      name,
      description,
      price
    };

    const createdProduct = await this.productsService.createProduct(newProduct);
    res.status(201);
    res.json({
      data: createdProduct,
    });
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const product = {
      id,
      name,
      description,
      price
    };

    const updatedProduct = await this.productsService.updateProduct(product);
    res.status(200);
    res.json({
      data: updatedProduct,
    });
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    await this.productsService.deleteById(id);

    res.status(204);
    res.send();
  };
}
